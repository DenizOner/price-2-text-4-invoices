// Event Bus Module: Modüller arası iletişim - SRP prensibi için ayrılmıştır
const Bus = (function () {
    const events = new Map();

    /**
     * Event listener ekler
     * @param {string} event - Event adı
     * @param {function} callback - Callback fonksiyon
     * @param {object} context - Context (opsiyonel)
     */
    function on(event, callback, context = null) {
        if (!events.has(event)) {
            events.set(event, []);
        }
        events.get(event).push({ callback, context });
    }

    /**
     * Event listener kaldırır
     * @param {string} event - Event adı
     * @param {function} callback - Callback fonksiyon
     * @param {object} context - Context (opsiyonel)
     */
    function off(event, callback, context = null) {
        if (!events.has(event)) return;

        const listeners = events.get(event);
        const filtered = listeners.filter(listener =>
            !(listener.callback === callback &&
                (context === null || listener.context === context))
        );

        if (filtered.length === 0) {
            events.delete(event);
        } else {
            events.set(event, filtered);
        }
    }

    /**
     * Event yayınlar
     * @param {string} event - Event adı
     * @param {*} data - Event verisi
     */
    function emit(event, data = null) {
        if (!events.has(event)) return;

        const listeners = events.get(event);
        listeners.forEach(listener => {
            try {
                listener.callback.call(listener.context, data);
            } catch (error) {
                console.error(`Event bus error for '${event}':`, error);
            }
        });
    }

    /**
     * Event listener'ları temizler
     * @param {string} event - Event adı (opsiyonel, belirtilmezse tümünü temizler)
     */
    function clear(event = null) {
        if (event) {
            events.delete(event);
        } else {
            events.clear();
        }
    }

    /**
     * Event'in listener sayısı
     * @param {string} event - Event adı
     * @returns {number} Listener sayısı
     */
    function listenerCount(event) {
        return events.has(event) ? events.get(event).length : 0;
    }

    /**
     * Event mevcut mu kontrol eder
     * @param {string} event - Event adı
     * @returns {boolean} Event mevcut mu
     */
    function has(event) {
        return events.has(event);
    }

    return {
        on,
        off,
        emit,
        clear,
        listenerCount,
        has
    };
})();

if (typeof module !== 'undefined') {
    module.exports = Bus;
}

window.Bus = Bus;