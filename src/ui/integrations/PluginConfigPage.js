import React from 'react';
import PropTypes from 'prop-types';

import pluginArray from 'entando-plugins';
import InternalPage from 'ui/internal-page/InternalPage';

const PluginConfigPage = ({ pluginId }) => {
  let PluginUiComponent = null;
  if (pluginArray && pluginArray.length) {
    const plugin = pluginArray.find(item => item.id === pluginId);
    if (plugin && plugin.uiComponent) {
      PluginUiComponent = plugin.uiComponent;
    }
  }
  return (
    <InternalPage>
      <PluginUiComponent />
    </InternalPage>
  );
};

PluginConfigPage.propTypes = {
  pluginId: PropTypes.string.isRequired,
};

export default PluginConfigPage;
