const i18n = {
  language: 'en',
  changeLanguage(language) {
    this.language = language;
    return Promise.resolve();
  },
  t: (str, options) =>
    options ? `${str} ${JSON.stringify(Object.values(options))}` : str,
};

export default i18n;
