import React from 'react';
import { MenuItem as PatternflyMenuItem } from 'patternfly-react';
import PropTypes from 'prop-types';

const MenuItem = ({ label, ...rest }) => (
  <PatternflyMenuItem {...rest}>
    {label}
  </PatternflyMenuItem>
);

MenuItem.propTypes = {
  label: PropTypes.string,
};

MenuItem.defaultProps = {
  label: 'search',
};


export default MenuItem;
