// Core Module: Dependency Injection ve Modül Yönetimi
const Core = (function () {
    // Event Bus
    const Bus = (function () {
        const on = function (event, handler) {
            document.addEventListener(event, e => handler(e.detail));
        };

        const emit = function (event, detail) {
            document.dispatchEvent(new CustomEvent(event, { detail }));
        };

        return {
            on,
            emit
        };
    })();

    // Modül Kayıt ve Yönetimi
    const modules = {};

    function registerModule(name, module) {
        modules[name] = module;
    }

    function getModule(name) {
        return modules[name];
    }

    // Core API
    return {
        Bus,
        registerModule,
        getModule,
        Constants: window.Constants,
        Utils: window.Utils,
        Validation: window.Validation
    };
})();

// Register Core in DI Container
window.DI.register('Core', Core);

window.AppCore = Core;
window.DIContainer = window.DI;
window.Bus = Core.Bus;