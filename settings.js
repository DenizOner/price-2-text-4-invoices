/**
 * Settings Module - Varsayılan yapılandırma değerleri
 * Bu dosya, uygulamanın varsayılan ayarlarını içerir.
 * HTML'de: <script src="settings.js"></script>
 * Kullanımı: Settings.defaultTheme, Settings.defaultLanguage vs.
 * 
 * @module Settings
 */

window.Settings = {
    /** @type {string|null} Varsayılan tema - null = sistem tercihini kullan */
    defaultTheme: 'dark',

    /** @type {string} Varsayılan para birimi (ISO 4217 kodu) */
    defaultCurrency: 'TRY',

    /** @type {string} Varsayılan dil (ISO 639-1 kodu) */
    defaultLanguage: 'tr',

    /** @type {string} Yönetici paneli URL'si */
    adminPanelUrl: 'https://app.netlify.com/projects/price-2-text-4-invoices/',

    /** @type {string[]} Desteklenen diller */
    supportedLanguages: ['tr', 'en'],

    /** @type {string[]} Desteklenen temalar */
    supportedThemes: ['light', 'dark'],

    /** @type {string[]} Desteklenen para birimleri */
    supportedCurrencies: ['TRY', 'USD', 'EUR']
};
