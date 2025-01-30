import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { DropdownButton as PatternflyDropButton } from 'patternfly-react';
import MenuItem from './MenuItem';

const DropdownButton = ({
  options, intl, onSelect, ...rest
}) => (
  <PatternflyDropButton {...rest} className="Dropdown-btn">
    {options.map(option => (
      <MenuItem
        key={option.value}
        eventKey={option.value}
        value={option.value}
        label={intl.formatMessage({ id: option.label })}
        onSelect={onSelect}
      />))}
  </PatternflyDropButton>);

DropdownButton.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  intl: intlShape.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default DropdownButton;
