// Dependency Injection Module: Bağımlılık yönetimi - DIP prensibi için ayrılmıştır
const DI = (function () {
    const services = new Map();
    const factories = new Map();

    /**
     * Servis kaydeder
     * @param {string} name - Servis adı
     * @param {*} service - Servis instance'ı
     * @param {boolean} singleton - Singleton mı (varsayılan: true)
     */
    function register(name, service, singleton = true) {
        if (singleton) {
            services.set(name, service);
        } else {
            factories.set(name, () => service);
        }
    }

    /**
     * Factory fonksiyonu kaydeder
     * @param {string} name - Servis adı
     * @param {function} factory - Factory fonksiyon
     */
    function registerFactory(name, factory) {
        factories.set(name, factory);
    }

    /**
     * Servis alır
     * @param {string} name - Servis adı
     * @returns {*} Servis instance'ı
     */
    function get(name) {
        if (services.has(name)) {
            return services.get(name);
        }

        if (factories.has(name)) {
            const factory = factories.get(name);
            const instance = factory();
            services.set(name, instance); // Cache for future use
            return instance;
        }

        throw new Error(`Service '${name}' not found`);
    }

    /**
     * Servis mevcut mu kontrol eder
     * @param {string} name - Servis adı
     * @returns {boolean} Servis mevcut mu
     */
    function has(name) {
        return services.has(name) || factories.has(name);
    }

    /**
     * Servis kaldırır
     * @param {string} name - Servis adı
     */
    function remove(name) {
        services.delete(name);
        factories.delete(name);
    }

    /**
     * Tüm servisleri temizler
     */
    function clear() {
        services.clear();
        factories.clear();
    }

    /**
     * Kayıtlı servisleri listeler
     * @returns {Array<string>} Servis adları
     */
    function list() {
        const serviceNames = Array.from(services.keys());
        const factoryNames = Array.from(factories.keys());
        return [...new Set([...serviceNames, ...factoryNames])];
    }

    /**
     * Servis bilgilerini alır
     * @param {string} name - Servis adı
     * @returns {object} Servis bilgileri
     */
    function info(name) {
        return {
            name,
            hasService: services.has(name),
            hasFactory: factories.has(name),
            type: services.has(name) ? 'singleton' : 'factory'
        };
    }

    /**
     * Bağımlılıkları enjekte eder
     * @param {function} constructor - Constructor fonksiyon
     * @param {Array<string>} dependencies - Bağımlılık adları
     * @returns {*} Instance
     */
    function inject(constructor, dependencies) {
        const deps = dependencies.map(dep => get(dep));
        return new constructor(...deps);
    }

    /**
     * Auto-wire: Constructor parametrelerinden otomatik bağımlılık enjeksiyonu
     * @param {function} constructor - Constructor fonksiyon
     * @returns {*} Instance
     */
    function autoWire(constructor) {
        // Function string'inden parametre isimlerini çıkar
        const funcString = constructor.toString();
        const paramMatch = funcString.match(/constructor\s*\(([^)]*)\)/);
        if (!paramMatch) {
            return new constructor();
        }

        const params = paramMatch[1]
            .split(',')
            .map(param => param.trim().split(' ')[0]) // Sadece parametre adı
            .filter(param => param.length > 0)
            .map(param => get(param));

        return new constructor(...params);
    }

    // Alias for get
    function resolve(name) {
        return get(name);
    }

    return {
        register,
        registerFactory,
        get,
        resolve,
        has,
        remove,
        clear,
        list,
        info,
        inject,
        autoWire
    };
})();

if (typeof module !== 'undefined') {
    module.exports = DI;
}

window.DI = DI;