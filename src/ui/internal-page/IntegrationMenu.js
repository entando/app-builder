import React from 'react';
import { FormattedMessage } from 'react-intl';
import { LinkMenuItem } from '@entando/menu';
import pluginArray from 'entando-plugins';

import { ROUTE_PLUGIN_CONFIG_PAGE } from 'app-init/router';


const InternalPage = () => {
  if (!pluginArray || !pluginArray.length) {
    return null;
  }
  return pluginArray
    .filter(plugin => (plugin.uiComponent && plugin.menuItemLabelId))
    .map(plugin => (
      <LinkMenuItem
        key={plugin.menuItemLabelId}
        id={`menu-plugin-${plugin.id}`}
        label={<FormattedMessage id={`plugin.${plugin.id}.${plugin.menuItemLabelId}`} />}
        route={ROUTE_PLUGIN_CONFIG_PAGE}
        params={{ pluginId: plugin.id }}
      />
    ));
};


export default InternalPage;
