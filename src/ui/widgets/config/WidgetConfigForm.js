import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';

const WidgetConfigForm = ({ onSubmit, widgetConfig }) =>
  (widgetConfig && widgetConfig.schema ? (
    <Form
      schema={widgetConfig.schema}
      formData={widgetConfig.formData}
      onSubmit={onSubmit}
    />
  ) : '');

WidgetConfigForm.propTypes = {
  widgetConfig: PropTypes.shape({}),
  onSubmit: PropTypes.func.isRequired,
};

WidgetConfigForm.defaultProps = {
  widgetConfig: null,
};

export default WidgetConfigForm;
