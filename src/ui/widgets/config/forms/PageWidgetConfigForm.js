import React from 'react';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

const PageWidgetConfigForm = ({ children, handleSubmit }) => (
  <div className="PageWidgetConfigForm">
    <form onSubmit={handleSubmit} className="form-horizontal">
      { children }
    </form>
  </div>
);

PageWidgetConfigForm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'pageWidgetConfig',
})(PageWidgetConfigForm);
