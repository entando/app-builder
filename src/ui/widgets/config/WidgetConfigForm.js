/*eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import SingleContentConfigFormContainer from 'ui/widgets/config/forms/SingleContentConfigFormContainer';

const CMS_WIDGETS_CONFIG_FORM_MAPPING = {
  content_viewer: <SingleContentConfigFormContainer />, // publih single handpicked content
  content_viewer_list: '', // publish list of contents
  row_content_viewer_list: '', // publish more than one handpicked content
  search_result: '',
};

const CMS_WIDGETS_CONFIG_FORMS = Object.keys(CMS_WIDGETS_CONFIG_FORM_MAPPING);

const WidgetConfigForm = ({ onSubmit, widgetCode, widgetConfig }) => {
  if (CMS_WIDGETS_CONFIG_FORMS.includes(widgetCode)) {
    return CMS_WIDGETS_CONFIG_FORM_MAPPING[widgetCode];
  }
  return (widgetConfig && widgetConfig.schema ? (
    <Form
      schema={widgetConfig.schema}
      formData={widgetConfig.formData}
      onSubmit={onSubmit}
    />
  ) : '');
};

WidgetConfigForm.propTypes = {
  widgetConfig: PropTypes.shape({}),
  widgetCode: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

WidgetConfigForm.defaultProps = {
  widgetConfig: null,
};

export default WidgetConfigForm;
