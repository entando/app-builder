import { get } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';
import apps from 'entando-apps';
import WidgetConfigMfeWrapper from 'ui/widgets/config/WidgetConfigMfeWrapper';

const widgetForms = apps.reduce((obj, app) => ({
  ...obj,
  ...app.widgetForms != null ? app.widgetForms : {},
}), {});

const isAppBuilderAppWidget = widgetCode => Object.keys(widgetForms).includes(widgetCode);

const errorComponent = (<FormattedMessage id="widget.page.config.error" />);

const WidgetConfigForm = ({
  onSubmit, widget, widgetCode, widgetConfig, pageCode, frameId, intl, history,
}) => {
  if (!widgetCode) {
    return errorComponent;
  }
  if (isAppBuilderAppWidget(widgetCode)) {
    return React.createElement(
      widgetForms[widgetCode],
      {
        widgetConfig, widgetCode, pageCode, frameId, intl, history,
      },
      null,
    );
  }
  if (!get(widget, 'bundleId') || !get(widget, 'configUi.resources.length') || !get(widget, 'configUi.customElement')) {
    return errorComponent;
  }
  return <WidgetConfigMfeWrapper widget={widget} widgetConfig={widgetConfig} onSubmit={onSubmit} />;
};

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
