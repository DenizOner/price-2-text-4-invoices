// Error Hint Module: Hata durumlarında kullanıcı bilgilendirme
(function ErrorHintModule() {
    // Dependency Injection ile bağımlılıkları al
    const Core = DIContainer.resolve('Core');
    const Constants = window.Constants;

    const resultEl = document.getElementById(Constants.ELEMENT_IDS.RESULT);
    const priceInput = document.getElementById(Constants.ELEMENT_IDS.PRICE);
    const islemMerkeziInput = document.getElementById(Constants.ELEMENT_IDS.ISLEM_MERKEZI);
    const gonderenInput = document.getElementById(Constants.ELEMENT_IDS.GONDEREN);
    const kartSahibiInput = document.getElementById(Constants.ELEMENT_IDS.KART_SAHIBI);
    const radios = [...document.querySelectorAll('input[name="payment"]')];

    const watch = [priceInput, islemMerkeziInput, gonderenInput, kartSahibiInput, ...radios];

    watch.forEach(el => {
        el.addEventListener('input', () => {
            if (resultEl.classList.contains('text-danger')) {
                // Hata durumunda tekrar göster
                Core.Utils.showToast(window.I18nTr.validation.invalidPrice, 'danger');
            }
        });
    });
})();