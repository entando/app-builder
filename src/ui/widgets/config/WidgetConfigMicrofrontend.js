import { get } from 'lodash';
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { getResourcePath, getMicrofrontend, renderMicrofrontend } from 'helpers/microfrontends';
import useScripts from 'helpers/useScripts';
import useStylesheets from 'helpers/useStylesheets';

export const MFE_WIDGET_FORM_ID = 'mfeWidgetForm';

const WidgetConfigMicrofrontend = ({
  widget, widgetConfig,
}) => {
  const resources = get(widget, 'configUi.resources', []).map(getResourcePath);
  const customElement = get(widget, 'configUi.customElement');

  const scripts = resources.filter(res => res.endsWith('.js'));
  const styleSheets = resources.filter(res => res.endsWith('.css'));

  const [everyScriptLoaded, someScriptError] = useScripts(scripts);
  const [everyStylesheetLoaded, someStylesheetError] = useStylesheets(styleSheets);

  useEffect(() => {
    const microfrontend = getMicrofrontend(customElement);
    if (everyScriptLoaded && microfrontend && widgetConfig) {
      microfrontend.config = widgetConfig;
    }
  }, [customElement, everyScriptLoaded, widgetConfig]);

  const microfrontendMarkup = renderMicrofrontend(customElement);
  return (scripts.length && everyScriptLoaded && everyStylesheetLoaded
    && !someScriptError && !someStylesheetError) ? (
      <Fragment>
        {microfrontendMarkup}
      </Fragment>
    ) : <FormattedMessage id="widget.page.config.error" />;
};

WidgetConfigMicrofrontend.propTypes = {
  widget: PropTypes.shape({}).isRequired,
  widgetConfig: PropTypes.shape({}),
};

WidgetConfigMicrofrontend.defaultProps = {
  widgetConfig: null,
};

export default WidgetConfigMicrofrontend;
