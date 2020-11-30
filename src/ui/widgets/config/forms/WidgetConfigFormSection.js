import { get } from 'lodash';
import React from 'react';
import { reduxForm } from 'redux-form';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { hasMicrofrontendConfig } from 'helpers/microfrontends';

import getAppBuilderWidgetForm from 'helpers/getAppBuilderWidgetForm';
import WidgetConfigMicrofrontend from 'ui/widgets/config/WidgetConfigMicrofrontend';
import SimpleWidgetConfigForm from './SimpleWidgetConfigForm';

const WidgetConfigFormSection = ({
  widget, parentWidget, config,
}) => {
  const currentWidgetConfigParameters = get(widget, 'parameters', []);
  const parentWidgetConfigParameters = get(parentWidget, 'parameters', []);
  const widgetConfigParameters = currentWidgetConfigParameters.length > 0 ?
    currentWidgetConfigParameters : parentWidgetConfigParameters;

  if (widgetConfigParameters.length) {
    return (
      <SimpleWidgetConfigForm
        widgetConfigParameters={widgetConfigParameters}
      />
    );
  }
  return <FormattedMessage id="widget.page.config.error" />;
};

WidgetConfigFormSection.propTypes = {
  parentWidget: PropTypes.shape({}),
  widget: PropTypes.shape({}),
  config: PropTypes.shape({}),
};

WidgetConfigFormSection.defaultProps = {
  parentWidget: null,
  widget: null,
  config: null,
};

export default WidgetConfigFormSection;
