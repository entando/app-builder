/*eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import HandpickedContentsConfigFormContainer from 'ui/widgets/config/forms/HandpickedContentsConfigFormContainer';
import ContentsQueryContainer from 'ui/widgets/common/form/ContentsQueryContainer';

const CMS_WIDGETS_CONFIG_FORM_MAPPING = {
  content_viewer: <HandpickedContentsConfigFormContainer />, // publish single handpicked content
  content_viewer_list: <ContentsQueryContainer />, // publish list of contents defined by a query
  row_content_viewer_list: <HandpickedContentsConfigFormContainer />, // publish more than one handpicked content
  search_result: '',
};

const CMS_WIDGETS_CONFIG_FORMS = Object.keys(CMS_WIDGETS_CONFIG_FORM_MAPPING);

const WidgetConfigForm = ({ onSubmit, widgetCode, widgetConfig }) => {
  console.log(widgetCode, widgetConfig);
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
