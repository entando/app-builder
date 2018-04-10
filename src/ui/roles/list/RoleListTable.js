import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Paginator, Alert, Spinner } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import RoleListMenuActions from 'ui/roles/list/RoleListMenuActions';
// import DeleteRoleModalContainer from 'ui/roles/common/DeleteRoleModalContainer';

class RoleListTable extends Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
  }

  componentWillMount() {
    this.props.onWillMount();
  }

  changePage(page) {
    this.props.onWillMount({ page, pageSize: this.props.pageSize });
  }

  renderTableRows() {
    return this.props.roles.map(role => (
      <tr key={role.code}>
        <td className="RoleListRow__td">{role.name}</td>
        <td className="RoleListRow__td">{role.code}</td>
        <td className="RoleListRow__td text-center">
          <RoleListMenuActions
            code={role.code}
            onClickDelete={this.props.onClickDelete}
          />
        </td>
      </tr>
    ));
  }

  renderTable() {
    if (this.props.roles.length > 0) {
      const pagination = {
        page: this.props.page,
        perPage: this.props.pageSize,
        perPageOptions: [5, 10, 15, 25, 50],
      };

      return (
        <Col xs={12}>
          <table className="RoleListTable__table table table-striped table-bordered">
            <thead>
              <tr>
                <th className="RoleListTable__th-lg"><FormattedMessage id="app.name" /></th>
                <th className="RoleListTable__th-lg"><FormattedMessage id="app.code" /></th>
                <th className="RoleListTable__th-xs text-center">
                  <FormattedMessage id="app.actions" />
                </th>
              </tr>
            </thead>
            <tbody>
              {this.renderTableRows()}
            </tbody>
          </table>
          <Paginator
            pagination={pagination}
            viewType="table"
            itemCount={this.props.totalItems}
            onPageSet={this.changePage}
          />
        </Col>
      );
    }
    return (
      <Col xs={12}>
        <Alert type="warning">
          <strong><FormattedMessage id="role.listEmpty" /></strong>
        </Alert>
      </Col>
    );
  }

  render() {
    return (
      <div className="RoleListTable">
        <Spinner loading={!!this.props.loading}>
          {this.renderTable()}
          {/* <DeleteRoleModalContainer /> */}
        </Spinner>
      </div>
    );
  }
}

RoleListTable.propTypes = {
  onWillMount: PropTypes.func,
  loading: PropTypes.bool,
  roles: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  onClickDelete: PropTypes.func,
};

RoleListTable.defaultProps = {
  onWillMount: null,
  loading: false,
  roles: [],
  onClickDelete: null,
};

export default RoleListTable;
