import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import Form from 'react-jsonschema-form';
import HandpickedContentsConfigFormContainer from 'ui/widgets/config/forms/HandpickedContentsConfigFormContainer';
import ContentsQueryContainer from 'ui/widgets/common/form/ContentsQueryContainer';

const CMS_WIDGETS_CONFIG_FORM_MAPPING = {
  // single handpicked content
  content_viewer: HandpickedContentsConfigFormContainer,
  // list of contents defined by a query
  content_viewer_list: ContentsQueryContainer,
  // more than one handpicked content
  row_content_viewer_list: HandpickedContentsConfigFormContainer,
  search_result: null,
};

const CMS_WIDGETS_CONFIG_FORMS = Object.keys(CMS_WIDGETS_CONFIG_FORM_MAPPING);

const WidgetConfigForm = ({
  onSubmit, widgetCode, widgetConfig, pageCode, frameId, intl, history,
}) => {
  if (CMS_WIDGETS_CONFIG_FORMS.includes(widgetCode)) {
    return React.createElement(
      CMS_WIDGETS_CONFIG_FORM_MAPPING[widgetCode],
      {
        widgetConfig, widgetCode, pageCode, frameId, intl, history,
      },
      null,
    );
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
  pageCode: PropTypes.string.isRequired,
  frameId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  history: PropTypes.shape({}).isRequired,
};

WidgetConfigForm.defaultProps = {
  widgetConfig: null,
};

export default WidgetConfigForm;
