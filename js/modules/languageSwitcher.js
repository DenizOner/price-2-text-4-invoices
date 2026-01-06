// Language Switcher Module: Dil değiştirme işlevselliği
(function LanguageSwitcherModule() {
    // Debug flag for production logging control
    const DEBUG = window.DEBUG || false;

    // Varsayılan dili Settings'den al
    // Varsayılan dili Settings'den al, yoksa 'tr' kullan
    let currentLang = window.Settings?.defaultLanguage || 'tr';
    window.currentLang = currentLang; // Global access

    /**
     * Initializes the language switcher by attaching event listeners to dropdown items.
     */
    function initLanguageSwitcher() {
        const dropdownItems = document.querySelectorAll('.dropdown-item[data-lang]');

        dropdownItems.forEach(item => {
            item.addEventListener('click', async function (e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                try {
                    await switchLanguage(lang);
                } catch (error) {
                    console.error('Failed to switch language:', error);
                    // Fallback: show user-friendly error message via toast
                    const errorMessage = window.t('toast.languageSwitchError');
                    if (window.Utils && typeof window.Utils.showToast === 'function') {
                        window.Utils.showToast(errorMessage, 'danger');
                    } else {
                        alert(errorMessage);
                    }
                }
            });

            // Debug: Log hover events to validate CSS hover effect
            item.addEventListener('mouseenter', function () {
                console.log('Hover entered on dropdown item:', this.textContent.trim());
            });
            item.addEventListener('mouseleave', function () {
                console.log('Hover left on dropdown item:', this.textContent.trim());
            });
        });

        // Set initial language display
        updateLanguageDisplay();
    }

    /**
     * Switches the application language.
     * @param {string} lang - The language code ('tr' or 'en').
     * @returns {Promise<void>}
     */
    async function switchLanguage(lang) {
        console.log('switchLanguage called with:', lang);
        if (lang === currentLang) {
            console.log('already on this language');
            return;
        }

        // Validate language
        if (!['tr', 'en'].includes(lang)) {
            throw new Error(`Invalid language: ${lang}`);
        }

        currentLang = lang;
        window.currentLang = currentLang; // Update global
        document.documentElement.lang = lang; // Update HTML lang attribute
        console.log('HTML lang attribute set to:', document.documentElement.lang);
        console.log('currentLang set to:', currentLang);

        try {
            // Check if translation objects are available
            if (lang === 'tr' && !window.I18nTr) {
                throw new ReferenceError('window.I18nTr is not defined');
            } else if (lang === 'en' && !window.I18nEn) {
                throw new ReferenceError('window.I18nEn is not defined');
            }

            // Update I18n object translations
            const translations = lang === 'tr' ? window.I18nTr : window.I18nEn;
            window.I18n.translations = translations;
            window.I18n.current = translations;
            window.I18n.currentLanguage = lang;
            if (DEBUG) console.log('I18n translations updated to window.I18n' + (lang === 'tr' ? 'Tr' : 'En'));

            // Reload translations asynchronously
            if (window.loadI18nTranslations) {
                if (DEBUG) console.log('calling loadI18nTranslations');
                await window.loadI18nTranslations(lang);
            } else {
                throw new Error('loadI18nTranslations function not available');
            }

            // Update language display
            updateLanguageDisplay();

            // Persist to localStorage with validation
            try {
                localStorage.setItem('selectedLanguage', lang);
                if (DEBUG) console.log('language saved to localStorage');
            } catch (storageError) {
                console.warn('Failed to save language to localStorage:', storageError);
                // Continue without failing the switch
            }

            // Emit event for other modules
            if (window.Bus) {
                window.Bus.emit('languageSwitcher:languageChanged', { language: lang });
            }

        } catch (error) {
            console.error('Error switching language:', error);
            // Revert changes on failure
            currentLang = currentLang === 'tr' ? 'en' : 'tr';
            window.currentLang = currentLang;
            throw error; // Re-throw to allow caller to handle
        }
    }

    /**
     * Updates the language display in the UI.
     */
    function updateLanguageDisplay() {
        const currentLangSpan = document.getElementById('currentLang');
        if (currentLangSpan) {
            currentLangSpan.textContent = currentLang.toUpperCase();
        }
    }

    /**
     * Loads the saved language from localStorage and applies it.
     * @returns {Promise<void>}
     */
    async function loadSavedLanguage() {
        try {
            // Varsayılan dili Settings'den al
            const defaultLang = window.Settings?.defaultLanguage || 'tr';
            const savedLang = localStorage.getItem('selectedLanguage');
            if (savedLang && ['tr', 'en'].includes(savedLang)) {
                await switchLanguage(savedLang);
            } else {
                // Set default to Settings'deki dil veya 'tr'
                localStorage.setItem('selectedLanguage', defaultLang);
                await switchLanguage(defaultLang);
            }
        } catch (error) {
            console.error('Failed to load saved language:', error);
            // Fallback to Settings'deki varsayılan dil
            const defaultLang = window.Settings?.defaultLanguage || 'tr';
            await switchLanguage(defaultLang);
        }
    }

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', function () {
        initLanguageSwitcher();

        // Set default I18n if available - Settings'den varsayılan dil
        const defaultLang = window.Settings?.defaultLanguage || 'tr';
        if (window.I18nTr) {
            window.I18n.translations = window.I18nTr;
            window.I18n.current = window.I18nTr;
            window.I18n.currentLanguage = defaultLang;
        }

        // Load saved language immediately (removed setTimeout for better performance)
        loadSavedLanguage();
    });

    // Global function for external access
    window.switchLanguage = switchLanguage;
})();