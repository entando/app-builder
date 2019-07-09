import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InternalPage from 'ui/internal-page/InternalPage';
import Form from 'react-jsonschema-form';


class PluginConfigPage extends Component {
  componentDidMount() {
    this.props.fetchSelectedPluginIfNotCached();
  }

  handleSubmit = (plugin) => {
    console.info(plugin.formData);
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
  fetchSelectedPluginIfNotCached: PropTypes.func.isRequired,
  savePluginConfig: PropTypes.func.isRequired,
  plugin: PropTypes.shape({}).isRequired,
};

export default PluginConfigPage;
