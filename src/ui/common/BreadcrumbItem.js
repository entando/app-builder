import React from 'react';
import { Link } from '@entando/router';
import { omit } from 'lodash';

import PropTypes from 'prop-types';

const BreadcrumbItem = (props) => {
  const { children, active, route } = props;
  let liClassName = 'BreadcrumbItem';
  let linkElement = children;

  if (active) {
    liClassName += ' active';
  } else if (route !== '') {
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
  route: PropTypes.string,
};

BreadcrumbItem.defaultProps = {
  active: false,
  route: '',
};

export default BreadcrumbItem;
