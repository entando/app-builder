import React from 'react';
import { FormattedMessage } from 'react-intl';
import LinkMenuItem from 'ui/common/LinkMenuItem';
import pluginArray from 'entando-plugins';
import { routeConverter } from 'helpers/routeConverter';

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
        to={routeConverter(ROUTE_PLUGIN_CONFIG_PAGE, { pluginId: plugin.id })}
      />
    ));
};


export default InternalPage;
