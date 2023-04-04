const i18n = {
  language: 'en',
  changeLanguage: () => new Promise(() => {}),
  t: (str, options) =>
    options ? `${str} ${JSON.stringify(Object.values(options))}` : str,
};

export default i18n;
