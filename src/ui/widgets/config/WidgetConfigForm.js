import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import apps from 'entando-apps';
import WidgetConfigMfeWrapper from 'ui/widgets/config/WidgetConfigMfeWrapper';

const widgetForms = apps.reduce((obj, app) => ({
  ...obj,
  ...app.widgetForms != null ? app.widgetForms : {},
}), {});

const INJECTED_APPS_WIDGETS_CONFIG_FORMS = Object.keys(widgetForms);

const WidgetConfigForm = ({
  onSubmit, widget, widgetCode, widgetConfig, pageCode, frameId, intl, history,
}) => (INJECTED_APPS_WIDGETS_CONFIG_FORMS.includes(widgetCode) ? React.createElement(
  widgetForms[widgetCode],
  {
    widgetConfig, widgetCode, pageCode, frameId, intl, history,
  },
  null,
) : <WidgetConfigMfeWrapper widget={widget} widgetConfig={widgetConfig} onSubmit={onSubmit} />);

WidgetConfigForm.propTypes = {
  widget: PropTypes.shape({}),
  widgetCode: PropTypes.string.isRequired,
  widgetConfig: PropTypes.shape({}),
  pageCode: PropTypes.string.isRequired,
  frameId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  history: PropTypes.shape({}).isRequired,
};

WidgetConfigForm.defaultProps = {
  widget: null,
  widgetConfig: null,
};

export default WidgetConfigForm;
