import React from 'react';
import PropTypes from 'prop-types';

const InternalPage = ({ className, children }) => (
  <div
    data-testid="internal-page"
    className={['InternalPage', className].join(' ').trim()}
  >
    {children}
  </div>
);

InternalPage.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

InternalPage.defaultProps = {
  children: null,
  className: '',
};

export default InternalPage;
