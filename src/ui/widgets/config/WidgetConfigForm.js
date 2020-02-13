import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';
import WidgetConfigMicrofrontend from 'ui/widgets/config/WidgetConfigMicrofrontend';
import { isAppBuilderAppWidgetForm, getAppBuilderWidgetForm } from 'helpers/apps';
import { isMicrofrontendWidgetForm } from 'helpers/microfrontends';

const errorComponent = (<FormattedMessage id="widget.page.config.error" />);

const WidgetConfigForm = ({
  onSubmit, widget, widgetCode, widgetConfig, pageCode, frameId, intl, history,
}) => {
  if (isAppBuilderAppWidgetForm(widgetCode)) {
    return React.createElement(
      getAppBuilderWidgetForm(widgetCode),
      {
        widgetConfig, widgetCode, pageCode, frameId, intl, history,
      },
      null,
    );
  }
  if (isMicrofrontendWidgetForm(widget)) {
    return (
      <WidgetConfigMicrofrontend
        widget={widget}
        widgetConfig={widgetConfig}
        onSubmit={onSubmit}
      />);
  }
  return errorComponent;
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
