// Datalist Loader Module: Datalist'leri JSON verilerinden dinamik olarak doldurur
(function () {
    // Datalist'leri doldur
    function populateDatalists() {
        console.log('populateDatalists called');

        // Global değişkenlerin yüklenip yüklenmediğini kontrol et
        console.log('window.transactionCenters:', window.transactionCenters);
        console.log('window.receiverAccounts:', window.receiverAccounts);
        console.log('window.currencyUnits:', window.currencyUnits);
        console.log('window.Config:', window.Config);

        // İşlem merkezleri
        const merkezList = document.getElementById('merkezList');
        console.log('merkezList element:', merkezList);
        if (merkezList) {
            console.log('merkezList found, calling Config.getDatalist');
            const merkezler = window.Config ? window.Config.getDatalist('islemMerkezleri') : [];
            console.log('merkezler:', merkezler);
            if (merkezler && merkezler.length > 0) {
                merkezler.forEach(merkez => {
                    const option = document.createElement('option');
                    option.value = merkez.value;
                    option.textContent = merkez.label;
                    merkezList.appendChild(option);
                    console.log('Added option to merkezList:', option);
                });
                console.log('merkezList children count:', merkezList.children.length);
            } else {
                console.warn('No merkezler data available');
            }
        } else {
            console.warn('merkezList element not found');
        }

        // Alan hesaplar
        const alanList = document.getElementById('alanList');
        console.log('alanList element:', alanList);
        if (alanList) {
            console.log('alanList found, calling Config.getDatalist');
            const hesaplar = window.Config ? window.Config.getDatalist('alanHesaplar') : [];
            console.log('hesaplar:', hesaplar);
            if (hesaplar && hesaplar.length > 0) {
                hesaplar.forEach(hesap => {
                    const option = document.createElement('option');
                    option.value = hesap.value;
                    option.textContent = hesap.label;
                    alanList.appendChild(option);
                    console.log('Added option to alanList:', option);
                });
                console.log('alanList children count:', alanList.children.length);
            } else {
                console.warn('No hesaplar data available');
            }
        } else {
            console.warn('alanList element not found');
        }

        // Gönderen hesaplar
        const gonderenList = document.getElementById('gonderenList');
        console.log('gonderenList element:', gonderenList);
        if (gonderenList) {
            console.log('gonderenList found, calling Config.getDatalist');
            const gonderenHesaplar = window.Config ? window.Config.getDatalist('gonderenHesaplar') : [];
            console.log('gonderenHesaplar:', gonderenHesaplar);
            if (gonderenHesaplar && gonderenHesaplar.length > 0) {
                gonderenHesaplar.forEach(hesap => {
                    const option = document.createElement('option');
                    option.value = hesap.value;
                    option.textContent = hesap.label;
                    gonderenList.appendChild(option);
                    console.log('Added option to gonderenList:', option);
                });
                console.log('gonderenList children count:', gonderenList.children.length);
            } else {
                console.warn('No gonderenHesaplar data available');
            }
        } else {
            console.warn('gonderenList element not found');
        }

        // Para birimleri
        const currencySelect = document.getElementById('currency');
        console.log('currencySelect element:', currencySelect);
        if (currencySelect) {
            console.log('currencySelect found, populating with window.currencyUnits');
            if (window.currencyUnits && window.currencyUnits.length > 0) {
                window.currencyUnits.forEach(unit => {
                    const option = document.createElement('option');
                    option.value = unit.value;
                    option.textContent = window.t ? window.t(unit.labelKey) : unit.labelKey;
                    currencySelect.appendChild(option);
                    console.log('Added option to currencySelect:', option);
                });
                console.log('currencySelect children count:', currencySelect.children.length);

                // Varsayılan para birimini seç (önce localStorage, sonra Settings, sonra ilk para birimi)
                const savedCurrency = localStorage.getItem('selectedCurrency');
                const defaultCurrency = window.Settings?.defaultCurrency || (window.currencyUnits[0]?.value);
                const currencyToSelect = savedCurrency || defaultCurrency;
                if (currencyToSelect) {
                    const matchingOption = currencySelect.querySelector(`option[value="${currencyToSelect}"]`);
                    if (matchingOption) {
                        matchingOption.selected = true;
                        console.log('Currency selected:', currencyToSelect, '(from:', savedCurrency ? 'localStorage' : 'default', ')');
                    }
                }
            } else {
                console.warn('No currencyUnits data available');
            }
        } else {
            console.warn('currencySelect element not found');
        }
    }

    // Sayfa yüklendiğinde çalıştır
    window.addEventListener('load', () => {
        // Config'in yüklenmesi için biraz bekle
        setTimeout(populateDatalists, 100);
    });

    // Dil değiştiğinde currency select option'larını güncelle
    if (window.Bus) {
        window.Bus.on('languageSwitcher:languageChanged', (data) => {
            const currencySelect = document.getElementById('currency');
            if (currencySelect && window.currencyUnits) {
                const options = currencySelect.querySelectorAll('option');
                options.forEach((option, index) => {
                    if (window.currencyUnits[index]) {
                        option.textContent = window.t ? window.t(window.currencyUnits[index].labelKey) : window.currencyUnits[index].labelKey;
                    }
                });
            }
        });
    }

    window.populateDatalists = populateDatalists;
})();