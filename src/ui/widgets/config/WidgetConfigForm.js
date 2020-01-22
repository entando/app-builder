import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import Form from 'react-jsonschema-form';
import apps from 'entando-apps';

const widgetForms = apps.reduce((obj, app) => ({
  ...obj,
  ...app.id === 'cms' ? app.widgetForms : {},
}), {});

const CMS_WIDGETS_CONFIG_FORMS = Object.keys(widgetForms);

const WidgetConfigForm = ({
  onSubmit, widgetCode, widgetConfig, pageCode, frameId, intl, history,
}) => {
  if (CMS_WIDGETS_CONFIG_FORMS.includes(widgetCode)) {
    return React.createElement(
      widgetForms[widgetCode],
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
