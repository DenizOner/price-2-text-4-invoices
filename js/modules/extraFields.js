// Extra Fields Module: Ek alanları yönetir
(function ExtraFieldsModule() {
    // Dependency Injection ile bağımlılıkları al
    const Core = DIContainer.resolve('Core');
    const Constants = window.Constants;
    const Validation = window.Validation;
    const I18n = window.I18n || { t: (key) => key };

    const islemMerkeziInput = document.getElementById(Constants.ELEMENT_IDS.ISLEM_MERKEZI);
    const gonderenInput = document.getElementById(Constants.ELEMENT_IDS.GONDEREN);
    const kartSahibiInput = document.getElementById(Constants.ELEMENT_IDS.KART_SAHIBI);
    const alanInput = document.getElementById(Constants.ELEMENT_IDS.ALAN);
    const islemMerkeziGroup = document.getElementById('islemMerkeziGroup');
    const gonderenGroup = document.getElementById('gonderenGroup');
    const alanGroup = document.getElementById('alanGroup');

    [islemMerkeziInput, gonderenInput, kartSahibiInput, alanInput].forEach(el => {
        el.addEventListener('input', () => {
            Validation.validateOptional(el.value, el);
            Core.Bus.emit(Constants.EVENTS.FORM_CHANGED, { byUser: false, source: el.id });
        });
        el.addEventListener('change', () => Core.Bus.emit(Constants.EVENTS.FORM_CHANGED, { byUser: true, source: el.id }));
    });

    islemMerkeziInput.addEventListener('blur', () => {
        if (!islemMerkeziGroup.classList.contains('d-none')) {
            Validation.validateRequired(islemMerkeziInput.value, I18n.t('validation.requiredIslemMerkezi'), islemMerkeziInput);
        }
    });

    gonderenInput.addEventListener('blur', () => {
        if (!gonderenGroup.classList.contains('d-none')) {
            const paymentSel = document.querySelector('input[name="payment"]:checked');
            if (paymentSel && paymentSel.value === Constants.PAYMENT_METHODS.EFT) {
                Validation.validateRequired(gonderenInput.value, I18n.t('validation.requiredGonderen'), gonderenInput);
            } else {
                Validation.validateOptional(gonderenInput.value, gonderenInput);
            }
        }
    });

    alanInput.addEventListener('blur', () => {
        if (!alanGroup.classList.contains('d-none')) {
            const paymentSel = document.querySelector('input[name="payment"]:checked');
            if (paymentSel && paymentSel.value === Constants.PAYMENT_METHODS.EFT) {
                Validation.validateRequired(alanInput.value, I18n.t('validation.requiredAlan'), alanInput);
            } else {
                Validation.validateOptional(alanInput.value, alanInput);
            }
        }
    });
})();