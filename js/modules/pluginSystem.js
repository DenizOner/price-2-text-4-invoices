// Plugin System Module: Eklenti sistemi ile projeyi genişletilebilir hale getirir
(function PluginSystem() {
    // Dependency Injection ile bağımlılıkları al
    const Core = DIContainer.resolve('Core');
    const Constants = window.Constants;
    const Utils = window.Utils;
    const Config = window.Config;

    // Eklenti kaydı
    const plugins = new Map();
    const registeredPaymentMethods = new Map();

    // Eklenti kaydetme
    function registerPlugin(name, plugin) {
        if (typeof plugin !== 'object' || typeof plugin.init !== 'function') {
            console.error(`Plugin ${name} geçersiz format`);
            return false;
        }

        plugins.set(name, {
            ...plugin,
            enabled: true,
            registeredAt: new Date().toISOString()
        });

        console.log(`Plugin registered: ${name}`);
        return true;
    }

    // Eklenti etkinleştirme/devre dışı bırakma
    function togglePlugin(name, enabled) {
        if (plugins.has(name)) {
            plugins.get(name).enabled = enabled;
            return true;
        }
        return false;
    }

    // Eklenti listeleme
    function listPlugins() {
        return Array.from(plugins.entries()).map(([name, plugin]) => ({
            name,
            enabled: plugin.enabled,
            version: plugin.version || '1.0.0',
            description: plugin.description || 'No description'
        }));
    }

    // Yeni ödeme yöntemi ekle (OCP örneği)
    function registerPaymentMethod(methodId, config) {
        if (!methodId || !config) {
            console.error('Geçersiz ödeme yöntemi konfigürasyonu');
            return false;
        }

        // Config modülünü genişlet
        Config.extendPaymentMethods({
            [methodId]: config.text
        });

        // Constants'a ekle
        if (!Constants.PAYMENT_METHODS[methodId.toUpperCase()]) {
            Constants.PAYMENT_METHODS[methodId.toUpperCase()] = methodId;
        }

        // UI'ı güncelle (HTML'e yeni radio buton ekle)
        const paymentContainer = document.querySelector('.row.g-2');
        if (paymentContainer) {
            const newCol = document.createElement('div');
            newCol.className = 'col-6';
            newCol.innerHTML = `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="payment" id="pay${methodId}" value="${methodId}">
                    <label class="form-check-label" for="pay${methodId}">
                        <i class="${config.icon || 'bi bi-puzzle'} me-1"></i> ${config.label}
                    </label>
                </div>
            `;
            paymentContainer.appendChild(newCol);

            // Event listener ekle
            const radio = newCol.querySelector('input[type="radio"]');
            radio.addEventListener('change', e => {
                Core.Bus.emit(Constants.EVENTS.FORM_CHANGED, {
                    byUser: true,
                    source: 'payment',
                    value: methodId
                });
            });
        }

        registeredPaymentMethods.set(methodId, config);
        console.log(`Payment method registered: ${methodId}`);
        return true;
    }

    // Fiyat formatlayıcı ekle
    function registerPriceFormatter(name, formatter) {
        if (typeof formatter !== 'function') {
            console.error('Formatter must be a function');
            return false;
        }

        // Utils'a yeni formatlayıcı ekle
        if (!Utils.customFormatters) {
            Utils.customFormatters = new Map();
        }

        Utils.customFormatters.set(name, formatter);
        console.log(`Price formatter registered: ${name}`);
        return true;
    }

    // Eklenti çalıştırma
    function executePlugin(name, ...args) {
        const plugin = plugins.get(name);
        if (!plugin || !plugin.enabled) {
            return false;
        }

        try {
            return plugin.init(...args);
        } catch (error) {
            console.error(`Plugin ${name} execution error:`, error);
            return false;
        }
    }

    // Tüm eklentileri başlat
    function initializeAllPlugins() {
        plugins.forEach((plugin, name) => {
            if (plugin.enabled && typeof plugin.init === 'function') {
                try {
                    plugin.init(Core, Utils, Config);
                    console.log(`Plugin initialized: ${name}`);
                } catch (error) {
                    console.error(`Failed to initialize plugin ${name}:`, error);
                }
            }
        });
    }

    // Örnek eklentiler
    function registerSamplePlugins() {
        // Örnek: Döviz kuru eklentisi
        registerPlugin('currencyConverter', {
            version: '1.0.0',
            description: 'Fiyatı farklı para birimlerine çevirir',
            init: function (Core, Utils, Config) {
                console.log('Currency Converter Plugin initialized');

                // Yeni bir formatlayıcı ekle
                Utils.customFormatters = Utils.customFormatters || new Map();
                Utils.customFormatters.set('toUSD', (amount) => {
                    return (amount / 34.50).toFixed(2) + ' USD';
                });
            }
        });

        // Örnek: Fiyat geçmişi eklentisi
        registerPlugin('priceHistory', {
            version: '1.0.0',
            description: 'Son girilen fiyatları hatırlar',
            init: function (Core, Utils, Config) {
                console.log('Price History Plugin initialized');

                // LocalStorage'a fiyat kaydetme
                Core.Bus.on('form:changed', (data) => {
                    const priceInput = document.getElementById('price');
                    if (priceInput && priceInput.value) {
                        const history = JSON.parse(localStorage.getItem('priceHistory') || '[]');
                        history.unshift({
                            amount: priceInput.value,
                            timestamp: new Date().toISOString()
                        });
                        // Son 10 kaydı tut
                        const limitedHistory = history.slice(0, 10);
                        localStorage.setItem('priceHistory', JSON.stringify(limitedHistory));
                    }
                });
            }
        });

        // Örnek: Sanal POS eklentisi
        registerPaymentMethod('sanalpos2', {
            label: 'Sanal POS 2',
            icon: 'bi bi-credit-card-2-front',
            text: '{merkez} firmasına ait 2. sanal POS\'tan kredi kartıyla tahsil edilmiştir.'
        });
    }

    // Public API
    return {
        registerPlugin,
        togglePlugin,
        listPlugins,
        registerPaymentMethod,
        registerPriceFormatter,
        executePlugin,
        initializeAllPlugins,
        registerSamplePlugins
    };
})();

// Modülü kaydet
DIContainer.register('PluginSystem', () => window.PluginSystem);