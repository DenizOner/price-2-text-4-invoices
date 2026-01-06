// Tooltip Auto Hide Module: Tooltip'leri otomatik gizler
(function TooltipAutoHide() {
    // Tooltip'leri otomatik gizleme
    let hideTimeout;
    let clickTimeout;

    function hideAllTooltips() {
        const tooltips = document.querySelectorAll('.tooltip');
        tooltips.forEach(tooltip => {
            const instance = bootstrap.Tooltip.getInstance(tooltip.previousElementSibling);
            if (instance) {
                instance.hide();
            }
        });
    }

    // Tıklama olayı - hemen gizle, sonra tekrar gösterilebilir
    document.addEventListener('click', (e) => {
        // Tıklanan elementin tooltip'ini hemen gizle
        const clickedElement = e.target.closest('[data-bs-toggle="tooltip"]');
        if (clickedElement) {
            const instance = bootstrap.Tooltip.getInstance(clickedElement);
            if (instance) {
                instance.hide();
            }
        }

        // Diğer tooltip'leri de gizle
        clearTimeout(hideTimeout);
        hideAllTooltips();

        // Tıklama sonrası 500ms bekle, sonra tekrar tooltip'lere izin ver
        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => {
            // Bu sadece temizlik için, normal hover çalışmasını engellemez
        }, 500);
    });

    // Input olayı - 2 saniye sonra gizle
    document.addEventListener('input', () => {
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(hideAllTooltips, 2000);
    });

    // Form değişikliklerinde tooltip'leri gizle
    document.addEventListener('form:changed', () => {
        hideAllTooltips();
    });

    // Mouse leave olayı - hemen gizle
    document.addEventListener('mouseleave', (e) => {
        // Fare sayfadan ayrıldığında tüm tooltip'leri gizle
        if (e.target === document.documentElement || e.target === document.body) {
            clearTimeout(hideTimeout);
            hideAllTooltips();
        }
    });

    // Focus kaybı - hemen gizle
    document.addEventListener('focusout', (e) => {
        // Eğer focus kaybı bir tooltip tetikleyicisinden olduysa
        if (e.target.hasAttribute('data-bs-toggle')) {
            setTimeout(() => {
                const instance = bootstrap.Tooltip.getInstance(e.target);
                if (instance && !e.target.matches(':hover')) {
                    instance.hide();
                }
            }, 100);
        }
    });
})();