import { get } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button } from 'patternfly-react';

import { getMicrofrontend, renderMicrofrontend } from 'helpers/microfrontends';
import { getResourcePath } from 'helpers/resourcePath';
import useScripts from 'helpers/useScripts';
import useStylesheets from 'helpers/useStylesheets';
import WidgetConfigPanel from './WidgetConfigPanel';

const WidgetConfigMicrofrontend = ({
  onSubmit, widget, widgetConfig, onCancel, widgetCode, framePos, frameName, pageCode,
}) => {
  const resources = get(widget, 'configUi.resources', []).map(getResourcePath);
  const customElement = get(widget, 'configUi.customElement');

  const scripts = resources.filter(res => res.endsWith('.js'));
  const styleSheets = resources.filter(res => res.endsWith('.css'));

  const [everyScriptLoaded, someScriptError] = useScripts(scripts);
  const [everyStylesheetLoaded, someStylesheetError] = useStylesheets(styleSheets);

  // eslint-disable-next-line no-unused-vars
  const [enableSubmit, setEnableSubmit] = useState(true);

  useEffect(() => {
    const widgetConfigListenerName = 'widget-config';
    const listener = (e) => {
      const { save } = e.detail;
      setEnableSubmit(save);
    };

    window.addEventListener(widgetConfigListenerName, listener);

    return () => window.removeEventListener(widgetConfigListenerName, listener);
  }, []);

  const handleSubmit = () => {
    const configWebComponent = getMicrofrontend(customElement);
    const updatedWidgetConfig = configWebComponent ? configWebComponent.config : null;
    onSubmit(updatedWidgetConfig);
  };

  useEffect(() => {
    const microfrontend = getMicrofrontend(customElement);
    if (everyScriptLoaded && microfrontend && widgetConfig) {
      microfrontend.config = widgetConfig;
    }
  }, [customElement, everyScriptLoaded, widgetConfig]);

  const microfrontendMarkup = renderMicrofrontend(customElement);
  const shouldRender = (scripts.length && everyScriptLoaded && everyStylesheetLoaded
    && !someScriptError && !someStylesheetError);

  return (
    <WidgetConfigPanel
      widget={widget}
      widgetCode={widgetCode}
      framePos={framePos}
      frameName={frameName}
      pageCode={pageCode}
      buttons={
        shouldRender &&
        <Fragment>
          <Button
            className="pull-right save"
            type="submit"
            bsStyle="primary"
            onClick={handleSubmit}
          ><FormattedMessage id="app.save" />
          </Button>
          <Button
            className="pull-right cancel"
            type="submit"
            bsStyle="default"
            onClick={onCancel}
            style={{ marginRight: '5px' }}
          ><FormattedMessage id="app.cancel" />
          </Button>
        </Fragment>
      }
    >
      { shouldRender ? microfrontendMarkup : <FormattedMessage id="widget.page.config.error" /> }
    </WidgetConfigPanel>);
};

WidgetConfigMicrofrontend.propTypes = {
  widget: PropTypes.shape({}).isRequired,
  widgetConfig: PropTypes.shape({}),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  widgetCode: PropTypes.string.isRequired,
  framePos: PropTypes.number.isRequired,
  frameName: PropTypes.string.isRequired,
  pageCode: PropTypes.string.isRequired,
};

WidgetConfigMicrofrontend.defaultProps = {
  widgetConfig: null,
};

export default WidgetConfigMicrofrontend;
