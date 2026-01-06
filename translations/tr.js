// Translation data for Turkish
(function () {
    const translationsTr = {
        "app": {
            "title": "Fiyatı Yazıya Çevir"
        },
        "form": {
            "priceLabel": "Fiyat",
            "pricePlaceholder": "1.234,56 ₺",
            "paymentMethodLabel": "Ödeme Yöntemi",
            "paymentMethods": {
                "odenmemis": "Ödenmemiş",
                "nakit": "Nakit",
                "eft": "Havale / EFT",
                "pos": "POS Cihazı",
                "sanalpos": "Sanal POS"
            },
            "islemMerkeziLabel": "İşlem Merkezi:",
            "islemMerkeziPlaceholder": "İşlem Merkezi",
            "kartSahibiLabel": "Kart Üzerinde Yazan İsim",
            "gonderenLabel": "Gönderen Hesap:",
            "alanLabel": "Alan Hesap:",
            "clearButton": "Temizle",
            "copyButton": "Kopyala"
        },
        "validation": {
            "selectPaymentMethod": "Lütfen bir ödeme yöntemi seçin.",
            "invalidPrice": "Lütfen geçerli bir fiyat girin.",
            "requiredPrice": "Lütfen fiyat giriniz.",
            "requiredCurrency": "Lütfen para birimini seçin.",
            "requiredIslemMerkezi": "Lütfen işlem merkezini giriniz.",
            "requiredGonderen": "Lütfen gönderen hesap bilgisini giriniz.",
            "requiredAlan": "Lütfen alan hesap bilgisini giriniz."
        },
        "output": {
            "kartSahibi": "Kart sahibi:",
            "gonderenHesap": "Gönderen Hesap:",
            "alanHesap": "Alan Hesap:",
            "odenmemisNote": "İşbu faturanın vadesi fatura tarihinden itibaren 7 iş günüdür. Vade tarihinde ödenmemesi halinde yasal haklar saklıdır."
        },
        "paymentTexts": {
            "odenmemis": "Açık / tahsil edilmemiş olarak düzenlenmiştir.",
            "nakit": "Ayni ve nakdi olarak tahsil edilmiştir.",
            "eft": "Banka havalesi veya EFT yoluyla tahsil edilmiştir.",
            "pos": "İşletmemize kayıtlı POS cihazından kredi kartıyla tahsil edilmiştir.",
            "sanalpos": "{merkez} firmasına ait sanal POS'tan kredi kartıyla tahsil edilmiştir."
        },
        "theme": {
            "toggleTooltip": "Tema değiştirmek için tıklayın"
        },
        "admin": {
            "buttonText": "Yönetici Paneli",
            "tooltip": "Yönetim paneline ulaşmak için tıklayabilirsiniz."
        },
        "toast": {
            "copySuccess": "Metin kopyalandı!",
            "copyError": "Kopyalama başarısız.",
            "clearForm": "🗑️ Form temizlendi",
            "noTextToCopy": "Kopyalanacak bir metin yok.",
            "languageSwitchError": "Dil değiştirme sırasında bir hata oluştu. Lütfen sayfayı yenileyin."
        },
        "currency": {
            "lira": "Türk Lirası",
            "lira_plural": "Lira",
            "kurus": "Kuruş",
            "yalniz": "Yalnız",
            "belirtilmemis": "Belirtilmemiş",
            "sifir": "Sıfır",
            "yuz": "Yüz",
            "dollar": "Amerikan Doları",
            "dollar_plural": "Amerikan Doları",
            "cent": "Sent",
            "cent_plural": "Cent",
            "euro": "Euro",
            "euro_plural": "Euro",
            "cent_euro": "Sent"
        },
        "html": {
            "title": "Fiyatı Yazıya Çevir",
            "priceLabel": "Fiyat",
            "pricePlaceholder": "1.234,56₺",
            "priceTooltip": "Fiyatı giriniz (örn: 1.234,56)",
            "currencyTooltip": "Para birimini seçiniz",
            "languageDropdownTooltip": "Dil seçiniz",
            "paymentMethodLabel": "Ödeme Yöntemi",
            "islemMerkeziLabel": "İşlem Merkezi:",
            "islemMerkeziPlaceholder": "İşlem Merkezi",
            "kartSahibiLabel": "Kart Üzerinde Yazan İsim",
            "kartSahibiPlaceholder": "Kart Üzerinde Yazan İsim",
            "gonderenLabel": "Gönderen Hesap:",
            "gonderenPlaceholder": "Gönderen Hesap",
            "alanLabel": "Alan Hesap:",
            "alanPlaceholder": "Alan Hesap",
            "clearButton": "Temizle",
            "copyButton": "Kopyala",
            "themeToggleTooltip": "Tema değiştirmek için tıklayın",
            "adminTooltip": "Yönetim paneline ulaşmak için tıklayabilirsiniz.",
            "clearTooltip": "Formu temizlemek için 'Esc' tuşuna basabilirsiniz.",
            "copyTooltip": "Kopyalamak için Alt+C tuş kombinasyonunu kullanabilirsiniz.",
            "toastPlaceholder": "Mesaj buraya gelecek",
            "closeButton": "Kapat"
        },
        "numbers": {
            "ones": ["", "Bir", "İki", "Üç", "Dört", "Beş", "Altı", "Yedi", "Sekiz", "Dokuz"],
            "tens": ["", "On", "Yirmi", "Otuz", "Kırk", "Elli", "Altmış", "Yetmiş", "Seksen", "Doksan"],
            "thousands": ["", "Bin", "Milyon", "Milyar", "Trilyon", "Katrilyon", "Kentrilyon"]
        },
        "formatting": {
            "currencySymbols": {
                "TRY": "₺",
                "USD": "$",
                "EUR": "€"
            },
            "localeMap": {
                "TRY": "tr-TR",
                "USD": "en-US",
                "EUR": "de-DE"
            }
        }
    };

    window.I18nTr = translationsTr;
})();
