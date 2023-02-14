import React from 'react';
import { useTranslation } from 'react-i18next';

const SkipNavLink = ({ id }) => {
  const { t, i18n } = useTranslation();

  return (
    <a href={`#${id}`} className="skip-nav-link">
      {t('skip_to_content')}
    </a>
  );
};

export default SkipNavLink;
