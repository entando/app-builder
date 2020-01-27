import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button } from 'patternfly-react';

import useScript from 'ui/widgets/config/useScript';

const getFilePath = (bundleId, resource) => `${process.env.DOMAIN}/cmsresources/${bundleId}/${resource}`;

const getConfigMfe = customElement => document.querySelector(customElement);

const WidgetConfigMfeWrapper = ({ onSubmit, widget, widgetConfig }) => {
  if (!widget) {
    return '';
  }
  const { bundleId, configUi } = widget;
  const conf = configUi || { customElement: null, resources: [] };
  const { customElement, resources } = conf;

  const scriptsState = resources.map(res => useScript(getFilePath(bundleId, res)));

  const everyScriptLoaded = scriptsState.every((state) => {
    const loaded = state[0];
    return loaded;
  });

  const someScriptError = scriptsState.some((state) => {
    const error = state[1];
    return error;
  });

  const handleSubmit = () => {
    const configWebComponent = getConfigMfe(customElement);
    const updatedWidgetConfig = configWebComponent ? configWebComponent.config : null;
    onSubmit(updatedWidgetConfig);
  };

  useEffect(() => {
    const webComponent = getConfigMfe(customElement);
    if (webComponent && widgetConfig) {
      webComponent.config = widgetConfig;
    }
  }, [everyScriptLoaded]);

  // eslint-disable-next-line react/no-danger
  const webComponent = (<div dangerouslySetInnerHTML={{ __html: `<${customElement} />` }} />);

  return (everyScriptLoaded && !someScriptError) ? (
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
