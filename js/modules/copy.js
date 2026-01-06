// Copy Module: Panoya kopyalama işlemlerini yönetir
(function CopyModule() {
    // Dependency Injection ile bağımlılıkları al
    const Core = DIContainer.resolve('Core');
    const Constants = window.Constants;
    const Utils = window.Utils;

    const copyBtn = document.getElementById('copyBtn');
    const resultEl = document.getElementById(Constants.ELEMENT_IDS.RESULT);

    copyBtn.addEventListener('click', async () => {
        if (!resultEl.textContent.trim()) {
            Utils.showToast(window.t('toast.noTextToCopy'), 'danger');

            // Hata durumunda buton sallanma efekti
            copyBtn.classList.add('shake');
            setTimeout(() => copyBtn.classList.remove('shake'), 500);
            return;
        }

        try {
            if (typeof chrome !== 'undefined' && chrome.runtime) {
                // Chrome uzantısı bağlamında mesajlaşma kullan
                await new Promise((resolve, reject) => {
                    chrome.runtime.sendMessage({ action: 'copyToClipboard', text: resultEl.textContent }, (response) => {
                        if (chrome.runtime.lastError) {
                            reject(chrome.runtime.lastError);
                        } else if (response && response.success) {
                            resolve();
                        } else {
                            reject(new Error('Copy failed'));
                        }
                    });
                });
            } else {
                // Normal bağlamda navigator.clipboard kullan
                await navigator.clipboard.writeText(resultEl.textContent);
            }

            Utils.showToast(window.t('toast.copySuccess'), 'success');

            // Başarı durumunda buton animasyonu
            copyBtn.classList.add('copied');
            setTimeout(() => copyBtn.classList.remove('copied'), 600);

            // Çıktı alanı renk değişimi
            resultEl.classList.remove('text-danger');
            resultEl.classList.add('text-success');
            setTimeout(() => resultEl.classList.remove('text-success'), 2000);
        } catch {
            // Fallback: execCommand kullan
            const sel = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(resultEl);
            sel.removeAllRanges();
            sel.addRange(range);
            document.execCommand('copy');
            sel.removeAllRanges();

            // Fallback başarı mesajı
            Utils.showToast(window.t('toast.copySuccess'), 'success');
            copyBtn.classList.add('copied');
            setTimeout(() => copyBtn.classList.remove('copied'), 600);
        }
    });
})();