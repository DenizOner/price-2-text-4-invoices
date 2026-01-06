// Clear Module: Form temizleme işlemlerini yönetir
(function ClearModule() {
    // Dependency Injection ile bağımlılıkları al
    const Core = DIContainer.resolve('Core');
    const Constants = window.Constants;
    const Utils = window.Utils;

    const clearBtn = document.getElementById('clearBtn');

    // Eklenti sistemini başlat ve örnek eklentileri yükle
    function initializeSystems() {
        // Eklenti sistemini başlat ve örnek eklentileri yükle
        if (window.PluginSystem) {
            window.PluginSystem.registerSamplePlugins();
            window.PluginSystem.initializeAllPlugins();
            console.log('Plugin System initialized');

            // Eklenti listesini konsola yazdır
            const plugins = window.PluginSystem.listPlugins();
            console.log('Registered Plugins:', plugins);
        }
    }

    // Sistemleri başlat (sayfa yüklendiğinde)
    window.addEventListener('load', () => {
        setTimeout(initializeSystems, 100);
    });

    function clearForm() {
        const priceInput = document.getElementById(Constants.ELEMENT_IDS.PRICE);
        const islemMerkeziInput = document.getElementById(Constants.ELEMENT_IDS.ISLEM_MERKEZI);
        const gonderenInput = document.getElementById(Constants.ELEMENT_IDS.GONDEREN);
        const alanInput = document.getElementById(Constants.ELEMENT_IDS.ALAN);
        const kartSahibiInput = document.getElementById(Constants.ELEMENT_IDS.KART_SAHIBI);
        const resultEl = document.getElementById(Constants.ELEMENT_IDS.RESULT);
        const unpaidOption = document.getElementById('payOdenmemis');

        priceInput.value = '';
        priceInput.classList.remove('is-valid', 'is-invalid');
        islemMerkeziInput.value = '';
        gonderenInput.value = '';
        alanInput.value = '';
        kartSahibiInput.value = '';
        unpaidOption.checked = true;

        bootstrap.Collapse.getOrCreateInstance(document.getElementById('islemMerkeziGroup'), { toggle: false }).hide();
        bootstrap.Collapse.getOrCreateInstance(document.getElementById('gonderenGroup'), { toggle: false }).hide();
        bootstrap.Collapse.getOrCreateInstance(document.getElementById('alanGroup'), { toggle: false }).hide();
        bootstrap.Collapse.getOrCreateInstance(document.getElementById('kartSahibiGroup'), { toggle: false }).hide();

        resultEl.textContent = '';
        resultEl.classList.remove('text-danger', 'text-success');

        Utils.showToast(window.t('toast.clearForm'), 'success');
        priceInput.focus();

        Core.Bus.emit(Constants.EVENTS.FORM_CLEARED, {});
    }

    clearBtn.addEventListener('click', clearForm);

    document.addEventListener('keyup', e => {
        if (e.key === 'Escape') {
            e.preventDefault();
            clearForm();
        }
    });
})();
