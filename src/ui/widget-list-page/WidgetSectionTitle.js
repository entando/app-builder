import React from 'react';

import PropTypes from 'prop-types';

const WidgetSectionTitle = ({ title }) => (
  <div className="WidgetSectionTitle">
    <div className="WidgetListTable__type">
      <h3>{ title }</h3>
    </div>
  </div>
);

WidgetSectionTitle.propTypes = {
  title: PropTypes.string,
};

WidgetSectionTitle.defaultProps = {
  title: '',
};

export default WidgetSectionTitle;
