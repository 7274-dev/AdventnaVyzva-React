import sk from '../localization/sk';
import en from '../localization/en';

// TODO code: fix missing strings (login, query controls, alerts a.k.a toasts)

const langs = {
    'sk': sk,
    'en': en,
    'fuck': 'localization_failed'
};

const setDefaultLang = (newLang) => {
    localStorage.setItem('lang', newLang);
}

const localized = (stringId, language = 'fuck') => {
    const lang = langs[localStorage.getItem('lang')] || undefined;

    if (!lang) {
        return 'localization_failed';
    }

    return lang[stringId];
}

export { localized, setDefaultLang };
