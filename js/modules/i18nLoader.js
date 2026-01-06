// İ18n sistemi için gerekli çevirileri yükler
// Bu dosya DOM hazır olduğunda çalışır

// window.I18n objesini tanımla
if (!window.I18n) {
    // Varsayılan dili Settings'den al, yoksa 'tr' kullan
    const defaultLang = window.Settings?.defaultLanguage || 'tr';
    window.I18n = {
        currentLanguage: defaultLang,
        translations: null,
        current: null,
        t: function (key, params = {}) {
            if (!this.translations) {
                console.warn('Çeviriler henüz yüklenmemiş');
                return key;
            }

            const translations = this.translations;
            const keys = key.split('.');
            let value = translations;

            // Nested key'leri takip et
            for (const k of keys) {
                if (value && typeof value === 'object' && k in value) {
                    value = value[k];
                } else {
                    console.warn(`Çeviri anahtarı bulunamadı: ${key}`);
                    return key;
                }
            }

            if (typeof value === 'string') {
                // Parametreleri değiştir
                let result = value;
                for (const [param, paramValue] of Object.entries(params)) {
                    result = result.replace(new RegExp(`\\{${param}\\}`, 'g'), paramValue);
                }
                return result;
            }

            console.warn(`Çeviri değeri string değil: ${key}`);
            return key;
        }
    };
}

// DOM hazır olana kadar bekle
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18nLoader);
} else {
    initI18nLoader();
}

function initI18nLoader() {
    // I18n objesi hazır olana kadar bekle
    if (!window.I18n) {
        setTimeout(initI18nLoader, 100);
        return;
    }

    const I18n = window.I18n;
    // Varsayılan dili Settings'den al, yoksa 'tr' kullan
    const defaultLanguage = window.Settings?.defaultLanguage || 'tr';
    const currentLanguage = localStorage.getItem('selectedLanguage') || defaultLanguage;

    // Dil değiştirme fonksiyonu
    function changeLanguage(newLanguage) {

        if (window.I18n) {
            window.I18n.currentLanguage = newLanguage;
            localStorage.setItem('selectedLanguage', newLanguage);

            // Çevirileri yeniden yükle - doğrudan loadTranslations çağır
            loadTranslations(newLanguage);

            // UI güncellemeleri için event tetikle
            window.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { language: newLanguage }
            }));
        }
    }

    // Kaydedilen dili yükle
    function loadSavedLanguage() {
        const savedLanguage = localStorage.getItem('selectedLanguage') || currentLanguage;

        if (savedLanguage !== currentLanguage) {
            console.log('Kaydedilen dil yükleniyor:', savedLanguage);
            changeLanguage(savedLanguage);
            return;
        }

        console.log('Mevcut dil yükleniyor:', currentLanguage);

        // Çevirileri yükle ve uygula
        loadTranslations(currentLanguage);

        // Özel event tetikle
        window.dispatchEvent(new CustomEvent('translationsLoaded', {
            detail: {
                language: currentLanguage,
                translations: window.I18n.translations
            }
        }));
    }

    // Çeviri dosyasını doğrudan global fallback ile yükle
    function loadTranslations(language) {
        console.log(`Çeviriler yükleniyor: ${language}`);

        // Doğrudan global fallback kullan
        const translations = window[`I18n${language.charAt(0).toUpperCase() + language.slice(1)}`];

        if (translations) {
            // Çevirileri I18n objesine kaydet
            if (window.I18n) {
                window.I18n.translations = translations;
                window.I18n.current = translations; // Config modülü için gerekli

                console.log('Çeviriler global fallback ile yüklendi:', language);

                // HTML elementlerini güncelle
                updateHTMLElements();

                return translations;
            } else {
                throw new Error('I18n objesi tanımlı değil');
            }
        } else {
            console.error('Çeviri yükleme hatası: Global fallback başarısız');
            return null;
        }
    }

    // Çeviri fonksiyonu - global t fonksiyonu
    window.t = function (key, params = {}) {
        if (!window.I18n || !window.I18n.translations) {
            console.warn('Çeviriler henüz yüklenmemiş');
            return key;
        }

        const translations = window.I18n.translations;
        const currentLang = window.I18n.currentLanguage;

        // Key'i parçalara ayır (örn: "form.priceLabel" -> ["form", "priceLabel"])
        const keys = key.split('.');
        let value = translations;

        // Nested key'leri takip et
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(`Çeviri anahtarı bulunamadı: ${key}`);
                return key;
            }
        }

        if (typeof value === 'string') {
            // Parametreleri değiştir (örn: "{merkez}" -> "Merkez Adı")
            let result = value;
            for (const [param, paramValue] of Object.entries(params)) {
                result = result.replace(new RegExp(`\\{${param}\\}`, 'g'), paramValue);
            }
            return result;
        }

        console.warn(`Çeviri değeri string değil: ${key}`);
        return key;
    };

    // Çeviri anahtarını HTML elementlerine uygula
    function updateHTMLElements() {
        // data-i18n özniteliğine sahip tüm elementleri bul
        const elements = document.querySelectorAll('[data-i18n]');
        // data-i18n-tooltip özniteliğine sahip tüm elementleri bul
        const tooltipElements = document.querySelectorAll('[data-i18n-tooltip]');

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = window.t(key);

            if (translation && translation !== key) {
                // Element türüne göre içeriği güncelle
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    if (element.type === 'placeholder' || element.hasAttribute('placeholder')) {
                        element.placeholder = translation;
                    } else {
                        element.value = translation;
                    }
                } else if (element.hasAttribute('title') || element.hasAttribute('data-tooltip')) {
                    element.title = translation;
                    element.setAttribute('data-tooltip', translation);
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Tooltip elementleri için title set et
        tooltipElements.forEach(element => {
            const key = element.getAttribute('data-i18n-tooltip');
            const translation = window.t(key);

            if (translation && translation !== key) {
                element.title = translation;
                element.setAttribute('data-tooltip', translation);
                // Bootstrap 5 tooltip'ler data-bs-title kullanır
                element.setAttribute('data-bs-title', translation);
                console.log('Tooltip updated:', key, '->', translation);
            }
        });

        // Bootstrap tooltip'leri yenile (dil değişikliğinde güncellemek için)
        if (typeof window.refreshTooltips === 'function') {
            window.refreshTooltips();
        }
    }

    // Manuel çeviri yükleme fonksiyonu - global olarak erişilebilir
    window.loadI18nTranslations = async function (language) {
        // Varsayılan dili Settings'den al
        const defaultLang = window.Settings?.defaultLanguage || 'tr';
        const lang = language || defaultLang;
        console.log('Manuel çeviri yükleme başlatılıyor:', lang);

        if (!window.I18n) {
            console.error('I18n objesi tanımlı değil');
            return null;
        }

        try {
            const translations = await loadTranslations(language);

            if (translations) {
                // Çevirileri güncelle
                window.I18n.currentLanguage = language;
                window.I18n.translations = translations;
                window.I18n.current = translations; // Config modülü için gerekli

                // HTML elementlerini güncelle
                updateHTMLElements();

                // Event tetikle
                window.dispatchEvent(new CustomEvent('translationsLoaded', {
                    detail: {
                        language: language,
                        translations: translations
                    }
                }));

                console.log('Manuel çeviri yükleme tamamlandı:', language);
                return translations;
            } else {
                throw new Error('Çeviriler yüklenemedi');
            }
        } catch (error) {
            console.error('Manuel çeviri yükleme hatası:', error);
            return null;
        }
    };

    // Çeviri sistemini başlat
    loadSavedLanguage();
}
