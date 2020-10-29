/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { isMicrofrontendWidgetForm } from 'helpers/microfrontends';

import getAppBuilderWidgetForm from 'helpers/getAppBuilderWidgetForm';
import WidgetConfigMicrofrontend from 'ui/widgets/config/WidgetConfigMicrofrontend';
import SimpleWidgetConfigForm from '../forms/SimpleWidgetConfigForm';

export const WIDGET_FORM_ID = 'widget-irakli';

class WidgetConfigRendererForm extends Component {
  render() {
    const {
      widget, widgetCode, widgetConfig, framePos, pageCode, onSubmit, intl, history,
    } = this.props;
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
            onSubmit={onSubmit}
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
  }
}

WidgetConfigRendererForm.propTypes = {
  intl: intlShape.isRequired,
  widget: PropTypes.shape({}),
  widgetCode: PropTypes.string.isRequired,
  widgetConfig: PropTypes.shape({}),
  framePos: PropTypes.number.isRequired,
  pageCode: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

WidgetConfigRendererForm.defaultProps = {
  widget: null,
  widgetConfig: null,
};

const WidgetConfigRenderer = injectIntl(reduxForm({
  form: WIDGET_FORM_ID,
})(WidgetConfigRendererForm));

export default WidgetConfigRenderer;
