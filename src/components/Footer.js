import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = ( ) => {
    const { t } = useTranslation();
    return (
        <div>
            <hr />
            <footer>
                <p className="hy-footer">
                    <span>© {t('university_of_helsinki')} 2021</span>
                    <br />
                    <span id="version" style={{ color: 'grey', fontSize: 'small', fontStyle: 'italic' }}>Commit Hash: {process.env.REACT_APP_GIT_HASH}</span>
                </p>
            </footer>
        </div>
    );
};

export default Footer;
