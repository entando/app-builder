import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Spinner } from 'patternfly-react';

import PageConfigGrid from 'ui/pages/config/PageConfigGrid';


class PageTemplateDetailTable extends Component {
  componentWillMount() {
    if (this.props.onWillMount) {
      this.props.onWillMount(this.props);
    }
  }

  renderContent() {
    const { loading, pageTemplate, cellMap } = this.props;
    if (!pageTemplate || loading) {
      return null;
    }
    return (
      <table className="PageTemplateDetailTable table table-bordered">
        <tbody>
          <tr>
            <th width="20%">
              <FormattedMessage id="app.name" />
            </th>
            <td>
              { pageTemplate.descr }
            </td>
          </tr>
          <tr>
            <th>
              <FormattedMessage id="app.code" />
            </th>
            <td>
              { pageTemplate.code }
            </td>
          </tr>
          <tr>
            <th>
              <FormattedMessage id="pageTemplates.pluginCode" />
            </th>
            <td>
              &nbsp;
            </td>
          </tr>
          <tr>
            <th>
              <FormattedMessage id="pageTemplates.jsonConfiguration" />
            </th>
            <td>
              <pre>
                { JSON.stringify(pageTemplate.configuration, null, 2) }
              </pre>
            </td>
          </tr>
          <tr>
            <th>
              <FormattedMessage id="pageTemplates.template" />
            </th>
            <td>
              <pre className="PageTemplateDetailTable__template">
                { pageTemplate.template }
              </pre>
            </td>
          </tr>
          <tr>
            <th>
              <FormattedMessage id="pageTemplates.templatePreview" />
            </th>
            <td>
              <PageConfigGrid cellMap={cellMap} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  render() {
    const { loading } = this.props;
    return (
      <Spinner loading={loading}>
        { this.renderContent() }
      </Spinner>
    );
  }
}


PageTemplateDetailTable.propTypes = {
  pageTemplate: PropTypes.shape({
    code: PropTypes.string,
    descr: PropTypes.string,
    configuration: PropTypes.shape({}),
    template: PropTypes.string,
  }),
  cellMap: PropTypes.shape({}),
  onWillMount: PropTypes.func,
  loading: PropTypes.bool.isRequired,
};

PageTemplateDetailTable.defaultProps = {
  pageTemplate: null,
  cellMap: null,
  onWillMount: null,
};

export default PageTemplateDetailTable;
