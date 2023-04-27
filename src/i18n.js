import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import resourcesToBackend from 'i18next-resources-to-backend';
import defaultFi from './locale/default/fi.json';
import defaultSv from './locale/default/sv.json';
import defaultEn from './locale/default/en.json';

const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER || '';

const bundledResources = {
  fi: {
    default: defaultFi,
  },
  sv: {
    default: defaultSv,
  },
  en: {
    default: defaultEn,
  },
};

const httpBackendOptions = {
  loadPath: `${ORGREK_BACKEND_SERVER}/api/texts/{{lng}}/{{ns}}`,
  allowMultiLoading: true,
  requestOptions: {
    // used for fetch, can also be a function (payload) => ({ method: 'GET' })
    mode: 'cors',
    credentials: 'same-origin',
    cache: 'default',
  },
};

export const initI18n = async (useHttpBackend = true) => {
  if (useHttpBackend) {
    i18n.use(ChainedBackend);
  }

  await i18n.use(initReactI18next).init({
    backend: {
      // Bundled resources must come before http backend, otherwise default
      // namespace loads an empty object from http backend
      backends: [resourcesToBackend(bundledResources), HttpBackend],
      backendOptions: [{}, httpBackendOptions],
    },
    react: {
      useSuspense: useHttpBackend,
    },
    resources: !useHttpBackend && bundledResources,
    ns: ['texts', 'default'],
    defaultNS: 'texts',
    fallbackNS: 'default',
    fallbackLng: {
      ia: ['ia'],
      default: ['fi'],
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });
};

export default i18n;
