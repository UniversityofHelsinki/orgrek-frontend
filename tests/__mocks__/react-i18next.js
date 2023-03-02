/**
 * Mock useTranslation hook in tests to just return the translation key and
 * options
 */
export const useTranslation = () => {
  return {
    t: (str, options) =>
      options ? `${str} ${JSON.stringify(Object.values(options))}` : str,
    i18n: {
      language: 'en',
      changeLanguage: () => new Promise(() => {}),
    },
  };
};
