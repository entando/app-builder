import { get } from 'lodash';
import React from 'react';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { hasMicrofrontendConfig } from 'helpers/microfrontends';

import getAppBuilderWidgetForm from 'helpers/getAppBuilderWidgetForm';
import WidgetConfigMicrofrontend from 'ui/widgets/config/WidgetConfigMicrofrontend';
import SimpleWidgetConfigForm from '../forms/SimpleWidgetConfigForm';

const WidgetConfigRenderer =
({
  widget, parentWidget, widgetConfig, framePos, pageCode, onSubmit, intl, history,
}) => {
  const widgetCode = widget ? widget.code : null;

  const renderWidgetConfigForm = () => {
    if (hasMicrofrontendConfig(widget)) {
      return (
        <WidgetConfigMicrofrontend
          widget={widget}
          widgetConfig={widgetConfig}
          onSubmit={onSubmit}
        />
      );
    }

    const appBuilderWidgetForm = getAppBuilderWidgetForm(widget);

    if (appBuilderWidgetForm) {
      const debugConfig = {
        ...widgetConfig,
        userFilters: [],
        filters: [],
      };

      return React.createElement(
        appBuilderWidgetForm,
        {
          widgetConfig: debugConfig, widgetCode, pageCode, frameId: framePos, intl, history,
        },
        null,
      );
    }
    const widgetConfigParameters = get(widget, 'parameters', []).length > 0 ? widget.parameters : get(parentWidget, 'parameters', []);
    if (widgetConfigParameters.length) {
      return (
        <SimpleWidgetConfigForm
          widgetConfigParameters={widgetConfigParameters}
          onSubmit={onSubmit}
        />
      );
    }
    return <FormattedMessage id="widget.page.config.error" />;
  };
  return (
    <React.Fragment>
      {renderWidgetConfigForm()}
    </React.Fragment>
  );
};

WidgetConfigRenderer.propTypes = {
  intl: intlShape.isRequired,
  widget: PropTypes.shape({}),
  widgetConfig: PropTypes.shape({}),
  framePos: PropTypes.number,
  pageCode: PropTypes.string,
  onSubmit: PropTypes.func,
  history: PropTypes.shape({}).isRequired,
};

WidgetConfigRenderer.defaultProps = {
  widget: null,
  widgetConfig: null,
  framePos: null,
  pageCode: '',
  onSubmit: () => {},
};

export default injectIntl(WidgetConfigRenderer);
