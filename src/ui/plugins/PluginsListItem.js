import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@entando/router';
import { ROUTE_PLUGIN_CONFIG_PAGE } from 'app-init/router';


const PluginsListItem = ({ plugin }) => (
  <Link
    route={ROUTE_PLUGIN_CONFIG_PAGE}
    params={{ id: plugin.id }}
  >
    {plugin.name}
  </Link>
);

PluginsListItem.propTypes = {
  plugin: PropTypes.shape({}),
};

PluginsListItem.defaultProps = {
  plugin: null,
};

export default PluginsListItem;
