import React from 'react';
import PropTypes from 'prop-types';
import { CardGrid, Spinner } from 'patternfly-react';

import InternalPage from 'ui/internal-page/InternalPage';
import PluginsListItem from 'ui/plugins/PluginsListItem';
import PluginListEmptyState from 'ui/plugins/PluginListEmptyState';

const PluginListPage = ({ plugins, loading }) => (

  <InternalPage className="PluginListPage">
    <Spinner loading={!!loading} className="middle">
      <CardGrid className="PluginListContainer" matchHeight>
        {plugins && plugins.length
          ? plugins.map(plugin => <PluginsListItem key={plugin.id} plugin={plugin} />)
          : <PluginListEmptyState />}
      </CardGrid>
    </Spinner>
  </InternalPage>
);


PluginListPage.propTypes = {
  plugins: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
};

PluginListPage.defaultProps = {
  plugins: [],
  loading: true,
};

export default PluginListPage;
