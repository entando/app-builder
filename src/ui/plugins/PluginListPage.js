import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CardGrid, Spinner } from 'patternfly-react';

import InternalPage from 'ui/internal-page/InternalPage';
import PluginsListItem from 'ui/plugins/PluginsListItem';
import PluginListEmptyState from 'ui/plugins/PluginListEmptyState';


class PluginListPage extends Component {
  componentDidMount() {
    this.props.fetchPlugins();
  }

  render() {
    const { plugins, loading } = this.props;
    return (
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
  }
}

PluginListPage.propTypes = {
  fetchPlugins: PropTypes.func,
  plugins: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
};

PluginListPage.defaultProps = {
  fetchPlugins: () => {},
  plugins: [],
  loading: true,
};

export default PluginListPage;
