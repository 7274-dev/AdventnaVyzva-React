import { render } from '../App';
import sk from '../localization/sk';
import en from '../localization/en';

// TODO lang: translate sk.json

const langs = {
    'sk': sk,
    'en': en
};

const setDefaultLang = (newLang) => {
    if (!newLang) {
        return;
    }

    localStorage.setItem('lang', newLang);
    render();
}

const localized = (stringId) => {
    const lang = langs[localStorage.getItem('lang')] || undefined;

    if (!lang) {
        console.log(lang)
        return 'localization_failed';
    }

    return lang[stringId];
}

export { localized, setDefaultLang };
