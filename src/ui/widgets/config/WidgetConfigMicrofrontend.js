import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button } from 'patternfly-react';

import { getResourcePath, getMicrofrontend, renderMicrofrontend } from 'helpers/microfrontends';
import useScripts from 'helpers/useScripts';
import useStylesheets from 'helpers/useStylesheets';

const WidgetConfigMicrofrontend = ({ onSubmit, widget, widgetConfig }) => {
  const { bundleId, configUi: { customElement, resources } } = widget;

  const scripts = resources.filter(res => res.endsWith('.js'));
  const styleSheets = resources.filter(res => res.endsWith('.css'));

  const getFullPath = resource => getResourcePath(bundleId, resource);
  const [everyScriptLoaded, someScriptError] = useScripts(scripts.map(getFullPath));
  const [everyStylesheetLoaded, someStylesheetError] = useStylesheets(styleSheets.map(getFullPath));

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
  }, [everyScriptLoaded, widgetConfig, customElement]);

  const microfrontendMarkup = renderMicrofrontend(customElement);

  return (everyScriptLoaded && everyStylesheetLoaded
    && !someScriptError && !someStylesheetError) ? (
      <Fragment>
        {microfrontendMarkup}
        <Button
          className="pull-right"
          type="submit"
          bsStyle="primary"
          onClick={handleSubmit}
        ><FormattedMessage id="app.save" />
        </Button>
      </Fragment>
    ) : <FormattedMessage id="widget.page.config.error" />;
};

WidgetConfigMicrofrontend.propTypes = {
  widget: PropTypes.shape({}),
  widgetConfig: PropTypes.shape({}),
  onSubmit: PropTypes.func.isRequired,
};

WidgetConfigMicrofrontend.defaultProps = {
  widget: null,
  widgetConfig: null,
};

export default WidgetConfigMicrofrontend;
