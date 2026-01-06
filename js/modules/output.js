// Output Module: Çıktı üretimini yönetir
(function OutputModule() {
    // Dependency Injection ile bağımlılıkları al, fallback ile
    const Core = (DIContainer && typeof DIContainer.resolve === 'function') ? DIContainer.resolve('Core') : { Bus: { on: () => { } } };
    const Config = window.Config || {
        paymentTexts: {},
        getPaymentText: (method) => `Ödeme metni: ${method}`
    };
    const Validation = window.Validation || {
        validateRequired: (value, message, element) => {
            if (!value.trim()) {
                if (window.Utils) window.Utils.showToast(message, 'danger');
                if (element) element.classList.add('is-invalid');
                return false;
            }
            if (element) element.classList.remove('is-invalid');
            return true;
        },
        sanitizeInput: (input) => input.replace(/[<>\"']/g, '')
    };
    const Utils = window.Utils || {
        setPaymentTexts: () => { },
        showToast: (msg, type) => console.log(`${type}: ${msg}`),
        numberToWords: (num, lang) => num.toString(),
        setResult: (text) => {
            const el = document.getElementById('result');
            if (el) el.textContent = text;
        }
    };
    const Constants = window.Constants || {
        ELEMENT_IDS: {
            RESULT: 'result',
            PRICE: 'price',
            ISLEM_MERKEZI: 'islemMerkezi',
            GONDEREN: 'gonderen',
            ALAN: 'alan',
            KART_SAHIBI: 'kartSahibi'
        },
        PAYMENT_METHODS: {
            SANALPOS: 'sanalpos',
            EFT: 'eft',
            ODEMEMIS: 'odenmemis'
        },
        EVENTS: {
            FORM_CHANGED: 'formChanged',
            GENERATE_REQUEST: 'generateRequest'
        }
    };
    const I18n = window.I18n || {
        t: (key) => key
    };

    const resultEl = document.getElementById(Constants.ELEMENT_IDS.RESULT);
    const currencyEl = document.getElementById('currency');

    // Config modülünden ödeme metinlerini Utils'a yükle
    Utils.setPaymentTexts(Config.paymentTexts);

    function generate(triggeredByUser = false) {
        const priceInput = document.getElementById(Constants.ELEMENT_IDS.PRICE);
        const islemMerkeziInput = document.getElementById(Constants.ELEMENT_IDS.ISLEM_MERKEZI);
        const gonderenInput = document.getElementById(Constants.ELEMENT_IDS.GONDEREN);
        const alanInput = document.getElementById(Constants.ELEMENT_IDS.ALAN);
        const kartSahibiInput = document.getElementById(Constants.ELEMENT_IDS.KART_SAHIBI);

        // Zorunlu alan validasyonları
        if (!Validation.validateRequired(priceInput.value, I18n.t('validation.requiredPrice'), priceInput)) return;
        if (!Validation.validateRequired(currencyEl.value, I18n.t('validation.requiredCurrency'), currencyEl)) return;

        const paymentSel = document.querySelector('input[name="payment"]:checked');
        const selectedCurrency = currencyEl ? currencyEl.value : 'TRY';
        if (!paymentSel) {
            if (triggeredByUser) {
                Utils.showToast(I18n.t('validation.selectPaymentMethod'), 'danger');
            }
            return;
        }

        // Fiyat validasyonu
        const raw = String(priceInput.value)
            .replace(/[^\d,.-]/g, '')
            .replace(/\./g, '')
            .replace(',', '.');
        const val = parseFloat(raw);
        if (isNaN(val)) {
            Utils.showToast(I18n.t('validation.invalidPrice'), 'danger');
            resultEl.classList.add('text-danger');
            priceInput.classList.add('is-invalid');
            priceInput.classList.remove('is-valid');
            return;
        }

        priceInput.classList.remove('is-invalid');
        priceInput.classList.add('is-valid');
        const lira = Math.floor(val);
        const kurus = Math.round((val - lira) * 100);

        // Para birimine göre currency anahtarlarını belirle
        let currencyMain = 'lira';
        let currencySub = 'kurus';
        if (selectedCurrency === 'USD') {
            currencyMain = 'dollar';
            currencySub = 'cent';
        } else if (selectedCurrency === 'EUR') {
            currencyMain = 'euro';
            currencySub = 'cent_euro';
        }

        const parts = [];
        const currentLang = window.currentLang || 'tr';
        const liraWords = Utils.numberToWords(lira, currentLang);
        if (liraWords) parts.push(liraWords + ' ' + I18n.t('currency.' + currencyMain + (lira > 1 ? '_plural' : '')));
        parts.push((kurus > 0 ? Utils.numberToWords(kurus, currentLang) : I18n.t('currency.sifir')) + ' ' + I18n.t('currency.' + currencySub + (kurus > 1 ? '_plural' : '')));

        let fullText = parts.join(' ');
        if (fullText) {
            const locale = currentLang === 'en' ? 'en-US' : 'tr-TR';
            fullText = fullText.charAt(0).toLocaleUpperCase(locale) + fullText.slice(1);
        }
        fullText = I18n.t('currency.yalniz') + ' ' + fullText;

        // Ödeme yöntemi validasyonları - sadece kullanıcı action ile (triggeredByUser true)
        const C = Constants.PAYMENT_METHODS;
        console.log('Validating payment method:', paymentSel.value, 'triggeredByUser:', triggeredByUser);
        if (triggeredByUser) {
            if (paymentSel.value === C.SANALPOS && !Validation.validateRequired(islemMerkeziInput.value, I18n.t('validation.requiredIslemMerkezi'), islemMerkeziInput)) {
                console.log('Sanalpos validation failed');
                return;
            }
            if (paymentSel.value === C.EFT && !Validation.validateRequired(gonderenInput.value, I18n.t('validation.requiredGonderen'), gonderenInput)) {
                console.log('EFT gonderen validation failed, value:', gonderenInput.value);
                return;
            }
            if (paymentSel.value === C.EFT && !Validation.validateRequired(alanInput.value, I18n.t('validation.requiredAlan'), alanInput)) {
                console.log('EFT alan validation failed, value:', alanInput.value);
                return;
            }
        }

        // Ödeme metnini al
        let payText = Config.getPaymentText(paymentSel.value);

        if (paymentSel.value === C.ODEMEMIS) {
            payText += '\n' + I18n.t('output.odenmemisNote');
        } else if (paymentSel.value === C.SANALPOS) {
            const merkez = islemMerkeziInput.value.trim() || I18n.t('currency.belirtilmemis');
            payText = Config.getPaymentText(C.SANALPOS, { merkez });
            const kart = kartSahibiInput.value.trim();
            if (kart) payText += '\n' + I18n.t('output.kartSahibi') + ': ' + Validation.sanitizeInput(kart);
        } else if (paymentSel.value === C.EFT) {
            payText += '\n' + I18n.t('output.gonderenHesap') + ': ' + Validation.sanitizeInput(gonderenInput.value.trim());
            const alan = alanInput.value.trim();
            if (alan) payText += '\n' + I18n.t('output.alanHesap') + ': ' + Validation.sanitizeInput(alan);
        }

        Utils.setResult((fullText + '\n' + payText).trim());
        resultEl.classList.remove('text-danger');

        // Yeni çıktı animasyonu ekle
        resultEl.classList.add('new-output');
        setTimeout(() => resultEl.classList.remove('new-output'), 400);
    }

    // Event dinleyicileri
    Core.Bus.on(Constants.EVENTS.FORM_CHANGED, ({ byUser = false } = {}) => generate(byUser));
    Core.Bus.on(Constants.EVENTS.GENERATE_REQUEST, ({ byUser = true } = {}) => generate(byUser));
    // Dil değişikliğinde önce Config'i güncelle, sonra generate et
    if (window.Bus) {
        window.Bus.on('languageSwitcher:languageChanged', () => {
            console.log('🌐 Output: Language changed, refreshing Config payment texts');
            if (Config.refreshFromI18n) {
                Config.refreshFromI18n();
            }
            generate(false);
        });
    }

    // Para birimi değişikliğinde generate çağır
    if (currencyEl) {
        currencyEl.addEventListener('change', () => generate(false));
    }

    // Global fonksiyon
    window.generateOutput = (byUser) => generate(Boolean(byUser));
})();
