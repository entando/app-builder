import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Button as PatternFlyButton } from 'patternfly-react';

const Button = ({
  children, className, ...props
}) => (
  <PatternFlyButton {...props} className={cx('Button', className)}>{children}</PatternFlyButton>
);

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
};


export default Button;
