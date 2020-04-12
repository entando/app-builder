import React from 'react';

import PropTypes from 'prop-types';

const WidgetSectionTitle = ({ title }) => (
  <div className="WidgetSectionTitle">
    <div className="WidgetSectionTitle__type">
      <h3>{ title }</h3>
    </div>
  </div>
);

WidgetSectionTitle.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

WidgetSectionTitle.defaultProps = {
  title: '',
};

export default WidgetSectionTitle;
