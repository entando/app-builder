import React from 'react';
import PropTypes from 'prop-types';
import { NavDropdown } from 'react-bootstrap';
import { Icon } from 'patternfly-react';

const InfoDropdown = ({ children }) => {
  const title = (
    <span>
      <Icon type="pf" name="info" />
    </span>
  );

  return (
    <NavDropdown id="InforDropdown" className="InfoDropdown" title={title}>
      { children }
    </NavDropdown>
  );
};

InfoDropdown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

InfoDropdown.defaultProps = {
  children: null,
};

export default InfoDropdown;
