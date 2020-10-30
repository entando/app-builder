import React from 'react';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { isMicrofrontendWidgetForm } from 'helpers/microfrontends';

import getAppBuilderWidgetForm from 'helpers/getAppBuilderWidgetForm';
import WidgetConfigMicrofrontend from 'ui/widgets/config/WidgetConfigMicrofrontend';
import SimpleWidgetConfigForm from '../forms/SimpleWidgetConfigForm';

export const WIDGET_FORM_ID = 'widget-irakli';

const WidgetConfigRenderer =
({
  widget, widgetCode, widgetConfig, framePos, pageCode, intl, history,
}) => {
  const renderWidgetConfigForm = () => {
    const appBuilderWidgetForm = getAppBuilderWidgetForm(widget);
    if (appBuilderWidgetForm) {
      return React.createElement(
        appBuilderWidgetForm,
        {
          widgetConfig, widgetCode, pageCode, frameId: framePos, intl, history,
        },
        null,
      );
    }
    if (isMicrofrontendWidgetForm(widget)) {
      return (
        <WidgetConfigMicrofrontend
          widget={widget}
          widgetConfig={widgetConfig}
        />
      );
    }

    const { parameters } = widget !== null && widget !== undefined && widget;

    if (parameters && parameters.length > 0) {
      return (
        <SimpleWidgetConfigForm parameters={parameters} />
      );
    }
    return <FormattedMessage id="widget.page.config.error" />;
  };
  return (
    <div>
      {renderWidgetConfigForm()}
    </div>
  );
};

WidgetConfigRenderer.propTypes = {
  intl: intlShape.isRequired,
  widget: PropTypes.shape({}),
  widgetCode: PropTypes.string.isRequired,
  widgetConfig: PropTypes.shape({}),
  framePos: PropTypes.number,
  pageCode: PropTypes.string,
  history: PropTypes.shape({}).isRequired,
};

WidgetConfigRenderer.defaultProps = {
  widget: null,
  widgetConfig: null,
  framePos: null,
  pageCode: '',
};

export default injectIntl(WidgetConfigRenderer);
