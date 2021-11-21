const useBrowserDarkMode = () => {
    try {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    catch (err) {
        return false;
    }
}

export { useBrowserDarkMode }
