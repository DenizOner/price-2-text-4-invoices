// Theme Toggle Module: Dark/Light mode geçişlerini yönetir
(function ThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    const body = document.body;

    // Kullanıcı tercihlerini yönet
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    // Tema geçişleri için yumuşak animasyonlar
    function applyTheme(theme, isSystemChange = false) {
        const isDark = theme === 'dark';

        // Tema geçişi animasyonu için transition sınıfı ekle
        body.classList.add('theme-transition');

        // Tema değiştirme
        body.classList.toggle('dark-mode', isDark);
        toggleBtn.textContent = isDark ? '☀️' : '🌙';

        // Animasyon ekle
        toggleBtn.classList.remove('glow-sun', 'glow-moon');
        requestAnimationFrame(() => {
            toggleBtn.classList.add(isDark ? 'glow-sun' : 'glow-moon');
        });

        // LocalStorage'a kaydet (sistem değişimi değilse)
        if (!localStorage.getItem('theme')) {
            localStorage.setItem('theme', theme);
        }

        // Animasyon sınıfını kaldır
        setTimeout(() => {
            body.classList.remove('theme-transition');
        }, 400);
    }

    // Başlangıç teması - Settings'den varsayılanı al, yoksa kullanıcı tercihini veya sistem tercihini kullan
    const defaultTheme = window.Settings?.defaultTheme;
    const initialTheme = defaultTheme || savedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);

    // Tema değiştirme
    toggleBtn.addEventListener('click', () => {
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Buton tıklama efekti
        toggleBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            toggleBtn.style.transform = '';
        }, 150);

        applyTheme(newTheme);
    });

    // Sistem teması değişimi dinleyicisi
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme, true);
        }
    });

    // Tema bilgisini dışa aktar (diğer modüllerin erişimi için)
    window.ThemeManager = {
        getCurrentTheme: () => body.classList.contains('dark-mode') ? 'dark' : 'light',
        applyTheme: applyTheme
    };
})();