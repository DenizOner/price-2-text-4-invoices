// Validation Module: Merkezi validasyon ve hata yönetimi
const Validation = (function () {
    // Temel validasyon fonksiyonları
    function validateRequired(value, message, el = null) {
        const empty = !String(value).trim();
        if (empty) {
            Utils.showToast(message, 'danger');
            if (el) { el.classList.add('is-invalid'); el.classList.remove('is-valid'); }
            document.getElementById('result').classList.add('text-danger');
            return false;
        }
        if (el) { el.classList.remove('is-invalid'); el.classList.add('is-valid'); }
        return true;
    }

    // Opsiyonel alan validasyonu - veri girilirse yeşil göster, boşsa hiçbir şey yapma
    function validateOptional(value, el = null) {
        const hasValue = String(value).trim();
        if (hasValue) {
            if (el) { el.classList.remove('is-invalid'); el.classList.add('is-valid'); }
            return true;
        } else {
            if (el) { el.classList.remove('is-invalid', 'is-valid'); }
            return true;
        }
    }

    function validateNumeric(value, message, el = null) {
        const num = parseFloat(value);
        if (isNaN(num) || num < 0) {
            Utils.showToast(message, 'danger');
            if (el) { el.classList.add('is-invalid'); el.classList.remove('is-valid'); }
            document.getElementById('result').classList.add('text-danger');
            return false;
        }
        if (el) { el.classList.remove('is-invalid'); el.classList.add('is-valid'); }
        return true;
    }

    function validatePattern(value, pattern, message, el = null) {
        if (!pattern.test(value)) {
            Utils.showToast(message, 'danger');
            if (el) { el.classList.add('is-invalid'); el.classList.remove('is-valid'); }
            document.getElementById('result').classList.add('text-danger');
            return false;
        }
        if (el) { el.classList.remove('is-invalid'); el.classList.add('is-valid'); }
        return true;
    }

    // XSS koruması için sanitization
    function sanitizeInput(input) {
        if (typeof input !== 'string') return input;

        return input
            .replace(/&/g, '&')
            .replace(/</g, '<')
            .replace(/>/g, '>')
            .replace(/"/g, '"')
            .replace(/'/g, "'")
            .replace(/\//g, '/');
    }

    // Fiyat validasyonu - sadece sayı ve belirli semboller
    function validatePriceInput(value) {
        const pattern = /^[\d\s.,₺]*$/;
        return pattern.test(value);
    }

    // Genişletilebilir validasyon sistemi
    const validators = {
        required: validateRequired,
        numeric: validateNumeric,
        pattern: validatePattern,
        price: validatePriceInput,
        sanitize: sanitizeInput
    };

    function addValidator(name, fn) {
        validators[name] = fn;
    }

    function getValidator(name) {
        return validators[name];
    }

    // Merkezi hata yönetimi
    function handleFieldError(element, message) {
        if (element) {
            element.classList.add('is-invalid');
            element.classList.remove('is-valid');
        }
        Utils.showToast(message, 'danger');
        document.getElementById('result').classList.add('text-danger');
    }

    function clearFieldError(element) {
        if (element) {
            element.classList.remove('is-invalid');
            element.classList.add('is-valid');
        }
        document.getElementById('result').classList.remove('text-danger');
    }

    return {
        validateRequired,
        validateOptional,
        validateNumeric,
        validatePattern,
        sanitizeInput,
        validatePriceInput,
        addValidator,
        getValidator,
        handleFieldError,
        clearFieldError
    };
})();

if (typeof module !== 'undefined') {
    module.exports = Validation;
}

window.Validation = Validation;