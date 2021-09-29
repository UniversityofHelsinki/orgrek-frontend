import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const backendOptions = {
    loadPath: 'http://localhost:8000/api/texts/{{lng}}',
    //'/locales/{{lng}}/{{ns}}.json',

    requestOptions: { // used for fetch, can also be a function (payload) => ({ method: 'GET' })
        mode: 'cors',
        credentials: 'same-origin',
        cache: 'default'
    }
}
i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        backend: backendOptions,
        fallbackLng: "fi",
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    })

export default i18n;
