import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageToggle() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-toggle">
      <button
        className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}
      >
        {t('english')}
      </button>
      <button
        className={`lang-btn ${i18n.language === 'ne' ? 'active' : ''}`}
        onClick={() => changeLanguage('ne')}
      >
        {t('nepali')}
      </button>
    </div>
  );
}

export default LanguageToggle;