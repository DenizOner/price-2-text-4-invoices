// Translation data for English
(function () {
    const translationsEn = {
        "app": {
            "title": "Convert Price to Text"
        },
        "form": {
            "priceLabel": "Price",
            "pricePlaceholder": "1,234.56 ₺",
            "paymentMethodLabel": "Payment Method",
            "paymentMethods": {
                "odenmemis": "Unpaid",
                "nakit": "Cash",
                "eft": "Bank Transfer / EFT",
                "pos": "POS Device",
                "sanalpos": "Online POS"
            },
            "islemMerkeziLabel": "Transaction Center:",
            "islemMerkeziPlaceholder": "Transaction Center",
            "kartSahibiLabel": "Cardholder Name",
            "gonderenLabel": "Sender Account:",
            "alanLabel": "Receiver Account:",
            "clearButton": "Clear",
            "copyButton": "Copy"
        },
        "validation": {
            "selectPaymentMethod": "Please select a payment method.",
            "invalidPrice": "Please enter a valid price.",
            "requiredPrice": "Please enter the price.",
            "requiredCurrency": "Please select the currency.",
            "requiredIslemMerkezi": "Please enter the transaction center.",
            "requiredGonderen": "Please enter the sender account information.",
            "requiredAlan": "Please enter the receiver account information."
        },
        "output": {
            "kartSahibi": "Cardholder:",
            "gonderenHesap": "Sender Account:",
            "alanHesap": "Receiver Account:",
            "odenmemisNote": "The due date of this invoice is 7 business days from the invoice date. Legal rights are reserved if not paid by the due date."
        },
        "paymentTexts": {
            "odenmemis": "Issued as open / uncollected",
            "nakit": "Received in cash and in kind.",
            "eft": "Received via bank transfer or EFT.",
            "pos": "Received through the POS device registered to our business.",
            "sanalpos": "Received through the online POS belonging to {merkez} company."
        },
        "theme": {
            "toggleTooltip": "Click to change theme"
        },
        "admin": {
            "buttonText": "Admin Panel",
            "tooltip": "Click to access the management panel."
        },
        "toast": {
            "copySuccess": "Text copied!",
            "copyError": "Copy failed.",
            "clearForm": "🗑️ Form cleared",
            "noTextToCopy": "No text to copy.",
            "languageSwitchError": "An error occurred while changing language. Please refresh the page."
        },
        "currency": {
            "lira": "Turkish Lira",
            "lira_plural": "Turkish Liras",
            "kurus": "Kurus",
            "yalniz": "Only",
            "belirtilmemis": "Unspecified",
            "sifir": "Zero",
            "hundred": "Hundred",
            "negative": "Negative",
            "dollar": "US Dollar",
            "dollar_plural": "US Dollars",
            "cent": "Cent",
            "cent_plural": "Cents",
            "euro": "Euro",
            "euro_plural": "Euros",
            "cent_euro": "Cent"
        },
        "html": {
            "title": "Convert Price to Text",
            "priceLabel": "Price",
            "pricePlaceholder": "1,234.56₺",
            "priceTooltip": "Enter the price (e.g., 1,234.56)",
            "currencyTooltip": "Select the currency",
            "languageDropdownTooltip": "Select language",
            "paymentMethodLabel": "Payment Method",
            "islemMerkeziLabel": "Transaction Center:",
            "islemMerkeziPlaceholder": "Transaction Center",
            "kartSahibiLabel": "Cardholder Name",
            "kartSahibiPlaceholder": "Cardholder Name",
            "gonderenLabel": "Sender Account:",
            "gonderenPlaceholder": "Sender Account",
            "alanLabel": "Receiver Account:",
            "alanPlaceholder": "Receiver Account",
            "clearButton": "Clear",
            "copyButton": "Copy",
            "themeToggleTooltip": "Click to change theme",
            "adminTooltip": "Click to access the management panel.",
            "clearTooltip": "Press 'Esc' to clear the form.",
            "copyTooltip": "Use Alt+C key combination to copy.",
            "toastPlaceholder": "Message will appear here",
            "closeButton": "Close"
        },
        "numbers": {
            "ones": ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
            "tens": ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
            "teens": ["", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
            "thousands": ["", "Thousand", "Million", "Billion", "Trillion", "Quadrillion", "Quintillion"]
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

    window.I18nEn = translationsEn;
})();
