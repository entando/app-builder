import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

const LinkMenuItem = ({
  id,
  label,
  active,
  to,
  className,
  onClick,
  pullRight,
  isNav,
}) => {
  let liClassName = 'LinkMenuItem';
  liClassName += className ? ` ${className}` : '';
  if (pullRight) {
    liClassName += ' pull-right';
  }
  if (active) {
    liClassName += ' active';
  }

  const LinkComponent = isNav ? NavLink : Link;

  return (
    <li key={to} className={liClassName} data-id={id}>
      <LinkComponent
        onClick={onClick}
        to={to}
      >
        { label }
      </LinkComponent>
    </li>
  );
};


LinkMenuItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  active: PropTypes.bool,
  className: PropTypes.string,
  pullRight: PropTypes.bool,
  onClick: PropTypes.func,
  to: PropTypes.string.isRequired,
  isNav: PropTypes.bool,
};

LinkMenuItem.defaultProps = {
  active: false,
  className: '',
  onClick: () => {},
  pullRight: false,
  isNav: false,
};


export default LinkMenuItem;
