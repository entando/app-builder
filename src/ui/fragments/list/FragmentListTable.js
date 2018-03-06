import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import FragmentListMenuActions from 'ui/fragments/list/FragmentListMenuActions';

class FragmentListTable extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const tr = this.props.fragments.map(fragment => (
      <tr key={fragment.code}>
        <td className="FragmentListRow__td">{fragment.code}</td>
        <td className="FragmentListRow__td">{fragment.widgetType.title}</td>
        <td className="FragmentListRow__td text-center">{fragment.pluginCode}</td>
        <td className="FragmentListRow__td text-center">
          <FragmentListMenuActions code={fragment.code} />
        </td>
      </tr>
    ));
    return (
      <div className="FragmentListTable">
        <Col md={12} className="FragmentListTable__table">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th><FormattedMessage id="app.name" /></th>
                <th><FormattedMessage id="fragment.table.widgetType" /></th>
                <th className="text-center" width="10%">
                  <FormattedMessage id="fragment.table.plugin" />
                </th>
                <th className="text-center" width="10%">
                  <FormattedMessage id="app.actions" />
                </th>
              </tr>
            </thead>
            <tbody>
              {tr}
            </tbody>
          </table>
        </Col>
      </div>
    );
  }
}

FragmentListTable.propTypes = {
  onWillMount: PropTypes.func,
  fragments: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    isLocked: PropTypes.bool.isRequired,
    widgetType: PropTypes.shape({
      code: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
    pluginCode: PropTypes.string,
  })),
};

FragmentListTable.defaultProps = {
  onWillMount: () => {},
  fragments: [],
};

export default FragmentListTable;
