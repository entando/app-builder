import React from 'react';
import { Link } from 'react-router-dom';
import { omit } from 'lodash';

import PropTypes from 'prop-types';

const BreadcrumbItem = (props) => {
  const { children, active, to } = props;
  let liClassName = 'BreadcrumbItem';
  let linkElement = children;

  if (active) {
    liClassName += ' active';
  } else if (to !== '') {
    linkElement = (
      <Link {...omit(props, ['active'])} >
        { children }
      </Link>
    );
  }

  return (
    <li className={liClassName}>
      {linkElement}
    </li>
  );
};

BreadcrumbItem.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
  to: PropTypes.string,
};

BreadcrumbItem.defaultProps = {
  active: false,
  to: '',
};

export default BreadcrumbItem;
