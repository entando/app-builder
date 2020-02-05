import React from 'react';
import PropTypes from 'prop-types';
import { CardGrid, Spinner } from 'patternfly-react';

import InternalPage from 'ui/internal-page/InternalPage';
import PluginsListItem from 'ui/plugins/PluginsListItem';
import PluginsPageEmptyState from 'ui/plugins/PluginsPageEmptyState';

const PluginsPage = ({ plugins, loading }) => (

  <InternalPage className="PluginsPage">
    <Spinner loading={!!loading} className="middle">
      <CardGrid className="SettingsListContainer" matchHeight>
        {plugins && plugins.length
          ? plugins.map(plugin => <PluginsListItem key={plugin.id} plugin={plugin} />)
          : <PluginsPageEmptyState />}
      </CardGrid>
    </Spinner>
  </InternalPage>
);


PluginsPage.propTypes = {
  plugins: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
};

PluginsPage.defaultProps = {
  plugins: [],
  loading: true,
};

export default PluginsPage;
