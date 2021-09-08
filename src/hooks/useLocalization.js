import sk from '../localization/sk';
import en from '../localization/en';

import { load as loadCookie, save as saveCookie } from 'react-cookies';


const langs = {
    'sk': sk,
    'en': en,
    'fuck': 'localization_failed'
};

const setDefaultLang = (newLang) => {
    saveCookie('lang', newLang);
}

const localized = (stringId, language = 'fuck') => {
    let lang = loadCookie('lang');
    lang = lang ? lang : 'fuck';

    if (lang === 'fuck' || langs[lang] === undefined) {
        return langs['fuck'];
    }

    return langs[lang][stringId];
}

export { localized, setDefaultLang };