import { render } from '../App';
import sk from '../localization/sk';
import en from '../localization/en';

// TODO code: fix missing strings (login, query controls, alerts a.k.a toasts)

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

const localized = (stringId, language = 'fuck') => {
    const lang = langs[localStorage.getItem('lang')] || undefined;

    if (!lang) {
        console.log(lang)
        return 'localization_failed';
    }

    return lang[stringId];
}

export { localized, setDefaultLang };
