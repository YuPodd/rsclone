const darkMode = document.getElementById('darkMode');
window.addEventListener('load', () => {
    if (darkMode) {
        initMode();
        darkMode.addEventListener('change', () => {
            resetMode();
        });
    }
});

function initMode() {
    const darkThemeSelected =
        localStorage.getItem('darkMode') !== null &&
        localStorage.getItem('darkMode') === 'dark';
    darkMode.checked = darkThemeSelected;
    darkThemeSelected ? document.body.setAttribute('data-theme', 'dark') :
        document.body.removeAttribute('data-theme');
}

function resetMode() {
    if (darkMode.checked) {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('darkMode', 'dark');
    } else {
        document.body.removeAttribute('data-theme');
        localStorage.removeItem('darkMode');
    }
}
