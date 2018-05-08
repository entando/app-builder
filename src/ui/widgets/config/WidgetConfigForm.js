import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import pluginArray from 'entando-plugins';
import InternalServletConfigForm from 'ui/widgets/config/forms/InternalServletConfigForm';

let pluginForms = {};
if (Array.isArray(pluginArray)) {
  pluginForms = pluginArray.reduce((acc, plugin) => {
    if (typeof plugin.widgetForms === 'object') {
      return Object.assign(acc, plugin.widgetForms);
    }
    return acc;
  }, {});
}

export const WidgetConfigFormBody = (props) => {
  if (pluginForms[props.widgetId]) {
    const PluginWidgetForm = pluginForms[props.widgetId];
    return <PluginWidgetForm {...props} />;
  }
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
