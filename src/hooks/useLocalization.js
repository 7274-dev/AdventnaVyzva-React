import { render } from '../App';
import sk from '../localization/sk';
import en from '../localization/en';

// TODO lang: translate sk.json

const langs = {
    'sk': sk,
    'en': en
};

const getDefaultLang = () => {
    let userLang = navigator.language || navigator.userLanguage; // "en-US"
    userLang = userLang.split('-')[0]; // "en"

    return langs.includes(userLang) ? userLang : 'sk';
}

const setLang = (newLang) => {
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

export { localized, getDefaultLang, setLang };
