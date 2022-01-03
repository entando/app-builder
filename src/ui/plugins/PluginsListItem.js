import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ROUTE_PLUGIN_CONFIG_PAGE } from 'app-init/router';
import { routeConverter } from '@entando/utils';


const PluginsListItem = ({ plugin }) => (
  <Link
    to={routeConverter(ROUTE_PLUGIN_CONFIG_PAGE, { id: plugin.id })}
  >
    {plugin.name}
  </Link>
);

PluginsListItem.propTypes = {
  plugin: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

PluginsListItem.defaultProps = {
  plugin: null,
};

export default PluginsListItem;
