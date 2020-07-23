import React from 'react';
import PropTypes from 'prop-types';
import getRuntimeEnv from 'helpers/getRuntimeEnv';

const LanguageSelect = ({ currentLanguage, onSelect }) => {
  const { LEGACY_ADMINCONSOLE_INTEGRATION_ENABLED } = getRuntimeEnv();

  const className = `LanguageSelect__dropdown${LEGACY_ADMINCONSOLE_INTEGRATION_ENABLED ? ' LanguageSelect__dropdown-legacy' : ''}`;

  return (
    <li className="LanguageSelect">
      <select
        onChange={e => onSelect(e.target.value)}
        defaultValue={currentLanguage}
        className={className}
      >
        <option value="en" className="LanguageSelect__option">EN</option>
        <option value="it" className="LanguageSelect__option">IT</option>
      </select>
      <span className="LanguageSelect__icon caret" />
    </li>
  );
};

LanguageSelect.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default LanguageSelect;
