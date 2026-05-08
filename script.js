// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    
    if (themeSwitch) {
        // 1. Initial Sync: Ensure checkbox matches the data-theme attribute set in the head
        const currentTheme = document.documentElement.getAttribute('data-theme');
        themeSwitch.checked = (currentTheme === 'dark');
        
        // 2. Listen for changes and update both data-theme and localStorage
        themeSwitch.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Optional: Sync across tabs/windows
    window.addEventListener('storage', (event) => {
        if (event.key === 'theme' && themeSwitch) {
            const newTheme = event.newValue;
            if (newTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeSwitch.checked = true;
            } else {
                document.documentElement.removeAttribute('data-theme');
                themeSwitch.checked = false;
            }
        }
    });
});
