// Payment Visibility Module: Ödeme yöntemi görünürlüğünü yönetir
(function PaymentVisibilityModule() {
    // Dependency Injection ile bağımlılıkları al
    const Core = DIContainer.resolve('Core');
    const Constants = window.Constants;

    const islemMerkeziGroup = document.getElementById('islemMerkeziGroup');
    const kartSahibiGroup = document.getElementById('kartSahibiGroup');
    const gonderenGroup = document.getElementById('gonderenGroup');
    const alanGroup = document.getElementById('alanGroup');

    const cIslem = bootstrap.Collapse.getOrCreateInstance(islemMerkeziGroup, { toggle: false });
    const cKart = bootstrap.Collapse.getOrCreateInstance(kartSahibiGroup, { toggle: false });
    const cGonder = bootstrap.Collapse.getOrCreateInstance(gonderenGroup, { toggle: false });
    const cAlan = bootstrap.Collapse.getOrCreateInstance(alanGroup, { toggle: false });

    // Alan hesap alanı açıldığında datalist'ler zaten doldurulmuş

    // Alan hesap alanı için event listener'lar
    const alanInput = document.getElementById('alan');
    alanInput.addEventListener('input', () => {
        Core.Bus.emit(Constants.EVENTS.FORM_CHANGED, { byUser: false, source: 'alan' });
    });

    alanInput.addEventListener('change', () => {
        Core.Bus.emit(Constants.EVENTS.FORM_CHANGED, { byUser: false, source: 'alan' });
    });

    document.querySelectorAll('input[name="payment"]').forEach(r => {
        r.addEventListener('change', e => {
            const val = e.target.value;
            const C = Constants.PAYMENT_METHODS;

            val === C.SANALPOS ? cIslem.show() : cIslem.hide();
            val === C.SANALPOS ? cKart.show() : cKart.hide();
            val === C.EFT ? cGonder.show() : cGonder.hide();
            val === C.EFT ? cAlan.show() : cAlan.hide();

            Core.Bus.emit(Constants.EVENTS.FORM_CHANGED, {
                byUser: true,
                source: 'payment',
                value: val
            });
        });
    });
})();