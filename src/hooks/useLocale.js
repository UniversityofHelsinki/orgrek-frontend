const changeLocale = (user) => {
  if (user && user.preferredLanguage) {
    document.documentElement.lang = user.preferredLanguage;
  } else {
    document.documentElement.lang = 'fi';
  }
};

export default changeLocale;
