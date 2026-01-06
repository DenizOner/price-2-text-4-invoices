// Utils Module: Yardımcı fonksiyonlar
const Utils = (function () {
    // Payment texts will be injected via Config module
    let paymentTexts = {};

    function setPaymentTexts(texts) {
        paymentTexts = texts;
    }

    function getNumbers(lang) {
        const i18n = lang === 'tr' ? window.I18nTr : window.I18nEn;
        return i18n.numbers;
    }

    function numberToWords(num, lang = 'tr') {
        num = Math.floor(num);
        if (num === 0) return (lang === 'tr' ? window.I18nTr : window.I18nEn).currency.sifir;

        if (lang === 'en') {
            return numberToWordsEn(num);
        } else {
            return numberToWordsTr(num);
        }
    }

    function numberToWordsTr(num) {
        const numbers = getNumbers('tr');
        const onesTr = numbers.ones;
        const tensTr = numbers.tens;
        const thousandsTr = numbers.thousands;
        const parts = [];
        let idx = 0;
        while (num > 0) {
            const chunk = num % 1000;
            if (chunk > 0) {
                let chunkParts = [];
                const hundred = Math.floor(chunk / 100);
                const remainder = chunk % 100;

                if (hundred) {
                    if (hundred === 1) chunkParts.push(window.I18nTr.currency.yuz);
                    else chunkParts.push(onesTr[hundred] + ' ' + window.I18nTr.currency.yuz);
                }

                if (remainder >= 10 && remainder < 20) {
                    const tenVal = Math.floor(remainder / 10);
                    chunkParts.push(tensTr[tenVal]);
                    if (remainder % 10) chunkParts.push(onesTr[remainder % 10]);
                } else {
                    const ten = Math.floor(remainder / 10);
                    const one = remainder % 10;
                    if (ten) chunkParts.push(tensTr[ten]);
                    if (one) chunkParts.push(onesTr[one]);
                }

                if (idx > 0) {
                    if (idx === 1 && chunk === 1) {
                        chunkParts = [thousandsTr[1]];
                    } else if (thousandsTr[idx]) {
                        chunkParts.push(thousandsTr[idx]);
                    }
                }
                parts.unshift(chunkParts.join(' ').trim());
            }
            num = Math.floor(num / 1000);
            idx++;
        }
        return parts.join(' ').replace(/\s+/g, ' ').trim();
    }

    function numberToWordsEn(num) {
        if (num === 0) return window.I18nEn.currency.sifir;
        if (num < 0) return window.I18nEn.currency.negative + ' ' + numberToWordsEn(-num);

        const numbers = getNumbers('en');
        const onesEn = numbers.ones;
        const tensEn = numbers.tens;
        const teensEn = numbers.teens;
        const thousandsEn = numbers.thousands;

        const parts = [];
        let idx = 0;
        while (num > 0) {
            const chunk = num % 1000;
            if (chunk > 0) {
                let chunkStr = numberToWordsEnChunk(chunk, onesEn, tensEn, teensEn);
                if (idx > 0 && thousandsEn[idx]) {
                    chunkStr += ' ' + thousandsEn[idx];
                }
                parts.unshift(chunkStr);
            }
            num = Math.floor(num / 1000);
            idx++;
        }
        return parts.join(' ').replace(/\s+/g, ' ').trim();
    }
    function numberToWordsEnChunk(num, onesEn, tensEn, teensEn) {
        const parts = [];
        const hundred = Math.floor(num / 100);
        const remainder = num % 100;

        if (hundred > 0) {
            parts.push(onesEn[hundred] + ' ' + window.I18nEn.currency.hundred);
        }

        if (remainder > 0) {
            if (remainder < 10) {
                parts.push(onesEn[remainder]);
            } else if (remainder < 20) {
                parts.push(teensEn[remainder - 10]);
            } else {
                const ten = Math.floor(remainder / 10);
                const one = remainder % 10;
                let str = tensEn[ten];
                if (one > 0) {
                    str += '-' + onesEn[one];
                }
                parts.push(str);
            }
        }

        return parts.join(' ').trim();
    }

    function formatOnBlur(value) {
        if (!value) return '';

        // Seçilen currency'yi al
        const currencySelect = document.getElementById('currency');
        const selectedCurrency = currencySelect ? currencySelect.value : 'TRY';

        // Currency sembollerini tanımla
        const currencySymbols = window.I18nTr.formatting.currencySymbols;

        // Locale mapping for currencies
        const localeMap = window.I18nTr.formatting.localeMap;

        const symbol = currencySymbols[selectedCurrency];
        const locale = localeMap[selectedCurrency];

        // Eğer zaten herhangi bir currency sembolü içeriyorsa, parse et ve yeniden formatla
        const allSymbols = Object.values(currencySymbols);
        const hasAnySymbol = allSymbols.some(sym => value.includes(sym));
        if (hasAnySymbol) {
            // Tüm symbol'leri çıkar
            let cleanValue = value;
            allSymbols.forEach(sym => {
                cleanValue = cleanValue.split(sym).join('');
            });

            // Currency'e göre doğru parsing yap
            // en-US: virgül bin ayracı, nokta ondalık ayracı
            // tr-TR/de-DE: nokta bin ayracı, virgül ondalık ayracı
            let num;
            if (locale === 'en-US') {
                // US format: sadece virgülleri kaldır (bin ayracı), noktayı koru
                cleanValue = cleanValue.replace(/,/g, '').trim();
                num = parseFloat(cleanValue);
            } else {
                // TR/DE format: noktaları kaldır, virgülü noktaya çevir
                cleanValue = cleanValue.replace(/\./g, '').replace(',', '.').trim();
                num = parseFloat(cleanValue);
            }

            if (isNaN(num)) return value;
            return new Intl.NumberFormat(locale, {
                style: 'currency', currency: selectedCurrency, minimumFractionDigits: 2
            }).format(num);
        }

        // Sadece rakamlardan oluşan değer için formatla
        const cleanValue = String(value).replace(',', '.').trim();
        const num = parseFloat(cleanValue);
        if (isNaN(num)) return value;
        return new Intl.NumberFormat(locale, {
            style: 'currency', currency: selectedCurrency, minimumFractionDigits: 2
        }).format(num);
    }

    function setResult(text) {
        const resultEl = document.getElementById('result');
        resultEl.textContent = text;
    }

    function validateRequired(value, message, el = null) {
        return Validation.validateRequired(value, message, el);
    }

    function showToast(message, type = 'success') {
        const toastBox = document.getElementById('toastBox');
        const toastMessage = document.getElementById('toastMessage');
        toastMessage.textContent = message;
        toastBox.classList.remove('bg-success', 'bg-danger');
        toastBox.classList.add(type === 'danger' ? 'bg-danger' : 'bg-success');
        const toast = new bootstrap.Toast(toastBox);
        toast.show();
    }

    return {
        numberToWords,
        formatOnBlur,
        setResult,
        validateRequired,
        showToast,
        paymentTexts,
        setPaymentTexts
    };
})();

if (typeof module !== 'undefined') {
    module.exports = Utils;
}

window.Utils = Utils;