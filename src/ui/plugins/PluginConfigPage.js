import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import InternalPage from 'ui/internal-page/InternalPage';
import Form from 'react-jsonschema-form';


class PluginConfigPage extends PureComponent {
  componentDidMount() {
    this.props.getOrFetchPlugin();
  }

  handleSubmit = (plugin) => {
    this.props.savePluginConfig(plugin);
  }

  render() {
    const { plugin } = this.props;
    return plugin && plugin.schema ? (
      <InternalPage>
        <Form
          schema={plugin.schema}
          onSubmit={this.handleSubmit}
        />
      </InternalPage>
    ) : '';
  }
}

PluginConfigPage.propTypes = {
  getOrFetchPlugin: PropTypes.func.isRequired,
  savePluginConfig: PropTypes.func.isRequired,
  plugin: PropTypes.shape({}).isRequired,
};

export default PluginConfigPage;
