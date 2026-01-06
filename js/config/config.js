// Config Module: Yapılandırma ayarları ve genişletilebilir ödeme metinleri
const Config = (function () {
    // Ödeme metinleri için state management
    let currentPaymentTexts = {};
    let isInitialized = false;

    // I18n modülünü bekle ve ödeme metinlerini güncelle
    const updatePaymentTexts = () => {
        if (typeof window !== 'undefined' && window.I18n && window.I18n.current && window.I18n.current.paymentTexts) {
            currentPaymentTexts = { ...window.I18n.current.paymentTexts };
            isInitialized = true;
            console.log('✅ Config: Payment texts updated from I18n:', currentPaymentTexts);

            // Payment text değişikliği event'i yayınla
            if (window.EventBus) {
                window.EventBus.emit('config:paymentTextsUpdated', currentPaymentTexts);
            }

            return true;
        }
        return false;
    };

    // I18n modülünü bekle ve başlat
    const initializePaymentTexts = () => {
        if (typeof window !== 'undefined') {
            // İlk deneme
            if (!updatePaymentTexts()) {
                console.log('⏳ Config: Waiting for I18n module...');
                // I18n modülünü bekle (max 5 saniye)
                let attempts = 0;
                const maxAttempts = 50; // 50 * 100ms = 5 saniye

                const checkI18n = setInterval(() => {
                    attempts++;
                    if (updatePaymentTexts() || attempts >= maxAttempts) {
                        clearInterval(checkI18n);
                    }
                }, 100);
            }
        }
    };

    // I18n event listener - dil değişikliklerini dinle
    const setupI18nListeners = () => {
        if (typeof window !== 'undefined' && window.Bus) {
            window.Bus.on('languageSwitcher:languageChanged', (newLanguage) => {
                console.log(`🌐 Config: Language changed to ${newLanguage}, updating payment texts`);
                updatePaymentTexts();
            });
        }
    };

    // PaymentText Manager
    class PaymentTextManager {
        static getPaymentText(method) {
            return currentPaymentTexts[method];
        }

        static getAllPaymentTexts() {
            return { ...currentPaymentTexts };
        }

        static hasPaymentText(method) {
            return !!currentPaymentTexts[method];
        }
    }

    // Public API
    return {
        // Direct access to getPaymentText for compatibility
        getPaymentText: (method, params = {}) => {
            const text = PaymentTextManager.getPaymentText(method);
            if (!text) return text;

            // Replace placeholders like {merkez} with params
            let result = text;
            for (const [key, value] of Object.entries(params)) {
                result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
            }
            return result;
        },

        // Payment Text Management
        paymentTexts: {
            get: PaymentTextManager.getPaymentText,
            getAll: PaymentTextManager.getAllPaymentTexts,
            has: PaymentTextManager.hasPaymentText,
            set: (method, text) => {
                currentPaymentTexts[method] = text;
                // Event yayınla
                if (window.EventBus) {
                    window.EventBus.emit('config:paymentTextChanged', { method, text });
                }
            }
        },

        // I18n Integration
        initI18n: () => {
            initializePaymentTexts();
            setupI18nListeners();
        },

        // Force refresh from I18n
        refreshFromI18n: () => {
            return updatePaymentTexts();
        },

        // Load payment texts from I18n (alias for refreshFromI18n)
        loadPaymentTextsFromI18n: () => {
            return updatePaymentTexts();
        },

        // Current state
        getState: () => ({
            isInitialized,
            isI18nLoaded: !!(window.I18n && window.I18n.current),
            hasPaymentTexts: Object.keys(currentPaymentTexts).length > 0,
            availableMethods: Object.keys(currentPaymentTexts),
            currentLanguage: window.I18n?.current?.language || 'unknown'
        }),

        // Clear payment texts (useful for testing)
        clearPaymentTexts: () => {
            Object.keys(currentPaymentTexts).forEach(key => {
                delete currentPaymentTexts[key];
            });
        },

        // Get datalist data for form fields
        getDatalist: (type) => {
            const datalists = {
                islemMerkezleri: window.transactionCenters,
                alanHesaplar: window.receiverAccounts,
                gonderenHesaplar: window.senderAccounts
            };
            return datalists[type] || [];
        }
    };
})();

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
    const initConfig = () => {
        console.log('🚀 Config: Initializing...');
        Config.initI18n();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initConfig);
    } else {
        initConfig();
    }

    // I18n modülü yüklendiğinde Config'i bilgilendir
    window.addEventListener('i18n:loaded', () => {
        console.log('📥 Config: I18n module loaded event received');
        Config.refreshFromI18n();
    });
}


// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Config;
}

// Global erişim için
if (typeof window !== 'undefined') {
    window.Config = Config;
}
