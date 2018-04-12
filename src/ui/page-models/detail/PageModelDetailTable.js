import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Spinner } from 'patternfly-react';

import PageConfigGrid from 'ui/pages/config/PageConfigGrid';


class PageModelDetailTable extends Component {
  componentWillMount() {
    if (this.props.onWillMount) {
      this.props.onWillMount(this.props);
    }
  }

  renderContent() {
    const { loading, pageModel, cellMap } = this.props;
    if (!pageModel || loading) {
      return null;
    }
    return (
      <table className="PageModelDetailTable table table-bordered">
        <tbody>
          <tr>
            <th width="20%">
              <FormattedMessage id="app.name" />
            </th>
            <td>
              { pageModel.descr }
            </td>
          </tr>
          <tr>
            <th>
              <FormattedMessage id="app.code" />
            </th>
            <td>
              { pageModel.code }
            </td>
          </tr>
          <tr>
            <th>
              <FormattedMessage id="pageModels.pluginCode" />
            </th>
            <td>
              &nbsp;
            </td>
          </tr>
          <tr>
            <th>
              <FormattedMessage id="pageModels.jsonConfiguration" />
            </th>
            <td>
              <pre>
                { JSON.stringify(pageModel.configuration, null, 2) }
              </pre>
            </td>
          </tr>
          <tr>
            <th>
              <FormattedMessage id="pageModels.template" />
            </th>
            <td>
              <pre>
                { pageModel.template }
              </pre>
            </td>
          </tr>
          <tr>
            <th>
              <FormattedMessage id="pageModels.templatePreview" />
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


PageModelDetailTable.propTypes = {
  pageModel: PropTypes.shape({
    code: PropTypes.string,
    descr: PropTypes.string,
    configuration: PropTypes.shape({}),
    template: PropTypes.string,
  }),
  cellMap: PropTypes.shape({}),
  onWillMount: PropTypes.func,
  loading: PropTypes.bool.isRequired,
};

PageModelDetailTable.defaultProps = {
  pageModel: null,
  cellMap: null,
  onWillMount: null,
};

export default PageModelDetailTable;
