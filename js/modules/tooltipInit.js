// Tooltip Init Module: Tooltip'leri başlatır ve yönetir
(function TooltipInit() {
    // Tooltip listesi - tüm aktif tooltip'leri saklar
    let tooltipList = [];

    // DOM hazır olana kadar bekle
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTooltips);
    } else {
        initTooltips();
    }

    /**
     * Tüm Bootstrap tooltip'lerini başlatır
     */
    function initTooltips() {
        // Önce mevcut tooltip'leri temizle
        disposeTooltips();

        // Bootstrap tooltip'leri başlat
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl, {
                trigger: 'hover focus',
                placement: 'top',
                animation: true
            });
        });

        console.log('Tooltips initialized:', tooltipList.length);
    }

    /**
     * Tüm aktif tooltip'leri temizler (dispose eder)
     */
    function disposeTooltips() {
        tooltipList.forEach(tooltip => {
            if (tooltip && typeof tooltip.dispose === 'function') {
                tooltip.dispose();
            }
        });
        tooltipList = [];
    }

    /**
     * Tüm tooltip'leri yeniler (dil değişikliği için)
     * Bu fonksiyon i18nLoader tarafından çağrılır
     */
    function refreshTooltips() {
        console.log('Refreshing tooltips...');
        initTooltips();
    }

    // Global erişim için fonksiyonları expose et
    window.refreshTooltips = refreshTooltips;
    window.initTooltips = initTooltips;
    window.disposeTooltips = disposeTooltips;
})();