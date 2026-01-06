// Price Input Module: Fiyat giriş işlemlerini yönetir
(function PriceInputModule() {
    // Dependency Injection ile bağımlılıkları al
    const Core = DIContainer.resolve('Core');
    const Constants = window.Constants;
    const Utils = window.Utils;

    const priceInput = document.getElementById(Constants.ELEMENT_IDS.PRICE);
    const currencySelect = document.getElementById(Constants.ELEMENT_IDS.CURRENCY);

    window.addEventListener('load', () => {
        priceInput.focus();
        priceInput.select();
    });

    priceInput.addEventListener('blur', () => {
        const formatted = Utils.formatOnBlur(priceInput.value);
        if (formatted) {
            priceInput.value = formatted;
            Core.Bus.emit(Constants.EVENTS.FORM_CHANGED, { byUser: false, source: 'price:mask' });
        }
    });

    priceInput.addEventListener('input', () => {
        Core.Bus.emit(Constants.EVENTS.FORM_CHANGED, { byUser: false, source: 'price' });
    });

    priceInput.addEventListener('change', () => {
        Core.Bus.emit(Constants.EVENTS.FORM_CHANGED, { byUser: false, source: 'price' });
    });

    currencySelect.addEventListener('change', () => {
        // Currency değiştiğinde localStorage'a kaydet
        localStorage.setItem('selectedCurrency', currencySelect.value);
        console.log('Currency saved to localStorage:', currencySelect.value);

        // Sadece sembolü değiştir, sayıyı koru
        if (priceInput.value) {
            const currencySymbols = window.I18nTr.formatting.currencySymbols;
            const newSymbol = currencySymbols[currencySelect.value] || '';

            // Mevcut sembolleri kaldır ve yeni sembolü ekle
            let value = priceInput.value;
            Object.values(currencySymbols).forEach(sym => {
                value = value.split(sym).join('');
            });

            priceInput.value = newSymbol + value.trim();
        }
        Core.Bus.emit(Constants.EVENTS.FORM_CHANGED, { byUser: false, source: 'currency' });
    });
})();