import React from 'react';
import PropTypes from 'prop-types';

const className = `LanguageSelect__dropdown${process.env.LEGACY_ADMINCONSOLE_INTEGRATION_ENABLED ? ' LanguageSelect__dropdown-legacy' : ''}`;

const LanguageSelect = ({ currentLanguage, onSelect }) => (
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

LanguageSelect.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default LanguageSelect;
