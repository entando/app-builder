import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import InternalServletConfigForm from 'ui/widgets/config/forms/InternalServletConfigForm';


export const WidgetConfigFormBody = (props) => {
  switch (props.widgetId) {
    case 'formAction':
      return <InternalServletConfigForm {...props} />;
    default:
      return <span>Error: there is no form for widget {props.widgetId}</span>;
  }
};

WidgetConfigFormBody.propTypes = {
  widgetId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const WrappedWidgetConfigForm = reduxForm({
  form: 'widgetConfigForm',
})(WidgetConfigFormBody);


export default WrappedWidgetConfigForm;
