import { render } from '../App';
import sk from '../localization/sk';
import en from '../localization/en';
// Q: what languages? en and sk

const langs = {
    'sk': sk,
    'en': en
}

const getDefaultLang = () => {
    // noinspection JSDeprecatedSymbols
    let userLang = navigator.language || navigator.userLanguage; // 'en-US'
    userLang = userLang.split('-')[0]; // 'en'

    return langs[userLang] ? userLang : 'sk';
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
        console.log(`Localization failed with lang ${lang}...`);
        return 'localization_failed';
    }

    return lang[stringId];
}

export { localized, getDefaultLang, setLang }
