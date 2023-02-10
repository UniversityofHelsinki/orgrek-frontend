import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const P = styled.p`
  margin-left: 10px;
`;

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div>
      <hr />
      <footer>
        <P>
          <span>© {t('university_of_helsinki')} 2021</span>
          <br />
          <span
            id="version"
            style={{ color: 'grey', fontSize: 'small', fontStyle: 'italic' }}
          >
            Commit Hash: {process.env.REACT_APP_GIT_HASH}
          </span>
        </P>
      </footer>
    </div>
  );
};

export default Footer;
