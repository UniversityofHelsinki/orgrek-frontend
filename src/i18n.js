import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';

const backendOptions = {
    loadPath: `${ORGREK_BACKEND_SERVER}/api/texts/{{lng}}/{{ns}}`,
    allowMultiLoading: true,
    requestOptions: { // used for fetch, can also be a function (payload) => ({ method: 'GET' })
        mode: 'cors',
        credentials: 'same-origin',
        cache: 'default'
    }
};
i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        backend: backendOptions,
        ns: ['texts', 'nodeattr', `nodeattr${new Date().toLocaleDateString('EN-CA')}`],
        defaultNS: 'texts',
        fallbackLng: 'fi',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });

export default i18n;
