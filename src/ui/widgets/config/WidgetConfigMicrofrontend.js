/* eslint-disable no-nested-ternary */
import { get } from 'lodash';
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button } from 'patternfly-react';

import { getMicrofrontend, renderMicrofrontend } from 'helpers/microfrontends';
import useMfe from 'hooks/useMfe';
import WidgetConfigPanel from './WidgetConfigPanel';

// normalize the widget object to what is expected by the hook
const normalizeMfeObject = (obj, assets) => ({
  id: get(obj, 'code'),
  customElement: get(obj, 'configUi.customElement', ''),
  name: get(obj, 'code'),
  assets,
});

const WidgetConfigMicrofrontend = ({
  onSubmit, widget, widgetConfig, onCancel, widgetCode, framePos, frameName, pageCode,
}) => {
  const resources = get(widget, 'configUi.resources', []);
  const { assetLoading, mfe, hasError } = useMfe(normalizeMfeObject(widget, resources));
  const customElement = get(mfe, 'customElement');

  const handleSubmit = () => {
    const configWebComponent = getMicrofrontend(customElement);
    const updatedWidgetConfig = configWebComponent ? configWebComponent.config : null;
    onSubmit(updatedWidgetConfig);
  };

  useEffect(() => {
    const microfrontend = getMicrofrontend(customElement);
    if (!assetLoading && microfrontend && widgetConfig) {
      microfrontend.config = widgetConfig;
    }
  }, [customElement, assetLoading, widgetConfig]);

  const microfrontendMarkup = renderMicrofrontend(customElement);
  const shouldRender = !assetLoading && !hasError && resources.length && customElement;

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
      {shouldRender ? microfrontendMarkup
        : assetLoading ? <FormattedMessage id="widget.page.config.loading" />
          : <FormattedMessage id="widget.page.config.error" />}
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
