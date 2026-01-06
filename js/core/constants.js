// Constants Module: Sabitler ve sabit yapılandırmalar
(function () {
    const PAYMENT_METHODS = {
        ODEMEMIS: 'odenmemis',
        NAKIT: 'nakit',
        EFT: 'eft',
        POS: 'pos',
        SANALPOS: 'sanalpos'
    };

    const ELEMENT_IDS = {
        PRICE: 'price',
        CURRENCY: 'currency',
        ISLEM_MERKEZI: 'islemMerkezi',
        GONDEREN: 'gonderen',
        ALAN: 'alan',
        KART_SAHIBI: 'kartSahibi',
        RESULT: 'result'
    };

    const EVENTS = {
        FORM_CHANGED: 'form:changed',
        FORM_CLEARED: 'form:cleared',
        GENERATE_REQUEST: 'generate:request'
    };

    window.Constants = {
        PAYMENT_METHODS,
        ELEMENT_IDS,
        EVENTS
    };
})();