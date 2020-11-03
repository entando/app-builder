import React from 'react';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { hasMicrofrontendConfig } from 'helpers/microfrontends';

import getAppBuilderWidgetForm from 'helpers/getAppBuilderWidgetForm';
import WidgetConfigMicrofrontend from 'ui/widgets/config/WidgetConfigMicrofrontend';
import SimpleWidgetConfigForm from '../forms/SimpleWidgetConfigForm';

const WidgetConfigRenderer =
({
  widget, widgetCode, widgetConfig, framePos, pageCode, onSubmit, intl, history,
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
    if (hasMicrofrontendConfig(widget)) {
      return (
        <WidgetConfigMicrofrontend
          widget={widget}
          widgetConfig={widgetConfig}
          onSubmit={onSubmit}
        />
      );
    }

    const { parameters } = widget !== null && widget !== undefined && widget;

    if (parameters && parameters.length > 0) {
      return (
        <SimpleWidgetConfigForm parameters={parameters} onSubmit={onSubmit} />
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
  widgetCode: PropTypes.string,
  widgetConfig: PropTypes.shape({}),
  framePos: PropTypes.number,
  pageCode: PropTypes.string,
  onSubmit: PropTypes.func,
  history: PropTypes.shape({}).isRequired,
};

WidgetConfigRenderer.defaultProps = {
  widget: null,
  widgetConfig: null,
  widgetCode: '',
  framePos: null,
  pageCode: '',
  onSubmit: () => {},
};

export default injectIntl(WidgetConfigRenderer);
