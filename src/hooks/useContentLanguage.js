import { useTranslation } from 'react-i18next';

/**
 * Returns the language that should be used for displaying attribute values
 *
 * Ensures that translation keys are not displayed as attribute values if the
 * current language is 'ia'.
 */
const useContentLanguage = () => {
  const { i18n } = useTranslation();

  return i18n.language === 'ia' ? 'fi' : i18n.language;
};

export default useContentLanguage;
