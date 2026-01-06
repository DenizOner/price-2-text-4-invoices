# price 2 text 4 invoices

A modern web application designed to convert price information into text.

---

## 🤝 Support the Project

MiPower is developed with the vision of contributing value to the open-source community. Your support is vital to maintain this project's continuity and development speed.

If you appreciate my work, you can support me through GitHub Sponsorships or the platforms below. Thank you in advance!

* [**GitHub Sponsors**](https://github.com/sponsors/DenizOner)
* [**Patreon**](https://patreon.com/rDenizOner)
* [**Buy Me a Coffee**](https://www.buymeacoffee.com/DenizOner)

Alternatively, you can click the **Sponsor button (❤️)** in the top right corner of the repository to see all funding options.

---

## 📌 Features

- **Price to Text Conversion**: Converts numerical price information to text in Turkish and English
  - Example: `150,00 TL` → `"One Hundred Fifty Turkish Lira"`

- **Multi-Language Support**
  - Turkish (default)
  - English

- **Theme Support**
  - Light theme
  - Dark theme

- **Currency Support**
  - TL (Turkish Lira)
  - USD (US Dollar)
  - EUR (Euro)

- **Additional Fields**
  - Receiver information
  - Sender information
  - Payment information

- **User-Friendly Interface**
  - Responsive design
  - Clean and modern UI
  - Quick copy feature

## 🛠 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling, animations, responsive design
- **JavaScript (ES6+)** - Vanilla JS, modular architecture
- **No external dependencies** - Completely independent, lightweight structure

## 📦 Installation

1. Clone or download the project:
```bash
git clone https://github.com/DenizOner/price-2-text-4-invoices.git
```

2. Open the project folder:
```bash
cd price-2-text-4-invoices
```

3. Open `index.html` in your browser.

> **Note**: The project does not require any server. It runs directly in the browser.

## 🚀 Usage

1. Enter the numerical value in the price field (e.g., `150.50`)
2. Select the currency
3. Click the "Convert to Text" button
4. Copy the result or use it directly

### Additional Fields

- **Receiver Information**: Enter the information of the money transfer recipient
- **Sender Information**: Enter the information of the money transfer sender
- **Payment Information**: Add bank account information for the account receiving the money transfer

### Theme Switching

You can switch between light/dark theme using the theme button in the top-right corner.

### Language Switching

You can switch between Turkish/English using the language selector in the top-right corner.

---

## ⚙️ Configuration

The application uses data files located in the `data/` directory. These files can be edited to customize the application:

| File | Description |
|------|-------------|
| [`data/transactionCenters.js`](data/transactionCenters.js) | Define frequently used transaction center options |
| [`data/receiverAccounts.js`](data/receiverAccounts.js) | Configure frequently used receiver account options |
| [`data/senderAccounts.js`](data/senderAccounts.js) | Configure frequently used sender account options |
| [`data/currencyUnits.js`](data/currencyUnits.js) | Define supported currency units |

### Editing Data Files

Each data file contains an array of objects with `value` and `label` properties:

```javascript
window.transactionCenters = [
    { value: 'Option 1', label: 'Option #1' },
    { value: 'Option 2', label: 'Option #2' },
    // Add more options as needed
];
```

> **Note**: After editing these files, simply refresh the page to see the changes.

---

Made with ❤️ for invoicing needs

