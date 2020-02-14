import React from 'react';
import PropTypes from 'prop-types';

import InternalPage from 'ui/internal-page/InternalPage';
import PluginsListItem from 'ui/plugins/PluginsListItem';
import PluginsPageEmptyState from 'ui/plugins/PluginsPageEmptyState';

const PluginsPage = ({ plugins }) => (
  <InternalPage className="PluginsPage">
    {plugins && plugins.length
      ? plugins.map(plugin => <PluginsListItem key={plugin.id} plugin={plugin} />)
      : <PluginsPageEmptyState />}
  </InternalPage>
);

PluginsPage.propTypes = {
  plugins: PropTypes.arrayOf(PropTypes.shape({})),
};

PluginsPage.defaultProps = {
  plugins: [],
};

export default PluginsPage;
