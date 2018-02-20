import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

const WidgetFormBody = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="name">Name</label>
      <Field name="name" component="input" type="text" />
    </div>
  </form>
);

WidgetFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const WidgetForm = reduxForm({
  form: 'widget',
})(WidgetFormBody);

export default WidgetForm;
