module.exports = {
  input: [
    'src/**/*.{js,jsx}',
    // Use ! to filter out files or directories
    // '!src/**/*.test.{js,jsx}',
  ],
  options: {
    debug: false,
    removeUnusedKeys: false,
    sort: true,
    func: {
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.js', '.jsx'],
    },
    lngs: ['en', 'fi', 'sv'],
    ns: ['default'],
    defaultLng: 'fi',
    defaultNs: 'default',
    defaultValue: (lng, ns, key) => key,
    resource: {
      loadPath: 'src/locales/{{ns}}.{{lng}}.json',
      savePath: 'src/locales/{{ns}}.{{lng}}.json',
    },
  },
};
