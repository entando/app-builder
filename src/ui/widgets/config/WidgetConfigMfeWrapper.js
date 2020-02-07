import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button } from 'patternfly-react';

import { getFilePath, getMfe, renderMfe } from 'helpers/microfrontends';
import useScripts from 'helpers/useScripts';
import useStylesheets from 'helpers/useStylesheets';

const WidgetConfigMfeWrapper = ({ onSubmit, widget, widgetConfig }) => {
  if (!widget) {
    return '';
  }
  const { bundleId, configUi } = widget;
  const conf = configUi || { customElement: null, resources: [] };
  const { customElement, resources } = conf;

  const scripts = resources.filter(res => res.endsWith('.js'));
  const styleSheets = resources.filter(res => res.endsWith('.css'));

  const getFullPath = res => getFilePath(bundleId, res);
  const [everyScriptLoaded, someScriptError] = useScripts(scripts.map(getFullPath));
  const [everyStylesheetLoaded, someStylesheetError] = useStylesheets(styleSheets.map(getFullPath));

  const handleSubmit = () => {
    const configWebComponent = getMfe(customElement);
    const updatedWidgetConfig = configWebComponent ? configWebComponent.config : null;
    onSubmit(updatedWidgetConfig);
  };

  useEffect(() => {
    const webComponent = getMfe(customElement);
    if (webComponent && widgetConfig) {
      webComponent.config = widgetConfig;
    }
  }, [everyScriptLoaded]);

  const webComponent = renderMfe(customElement);

  return (everyScriptLoaded && everyStylesheetLoaded
    && !someScriptError && !someStylesheetError) ? (
      <Fragment>
        {webComponent}
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

WidgetConfigMfeWrapper.propTypes = {
  widget: PropTypes.shape({}),
  widgetConfig: PropTypes.shape({}),
  onSubmit: PropTypes.func.isRequired,
};

WidgetConfigMfeWrapper.defaultProps = {
  widget: null,
  widgetConfig: null,
};

export default WidgetConfigMfeWrapper;
