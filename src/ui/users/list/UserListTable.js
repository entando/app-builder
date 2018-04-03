import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Paginator, Alert, Spinner } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { formattedText } from 'frontend-common-components';
import UserListMenuActions from 'ui/users/list/UserListMenuActions';
import UserStatus from 'ui/users/common/UserStatus';
import { USER_PROFILE_MOCK } from 'test/mocks/users';

class UserListTable extends Component {
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
    return this.props.users.map(user => (
      <tr key={user.username}>
        <td className="UserListRow__td">{user.username}</td>
        {/* FIXME: user profiles info */}
        <td className="UserListRow__td">{USER_PROFILE_MOCK[user.username].fullName}</td>
        <td className="UserListRow__td">{USER_PROFILE_MOCK[user.username].email}</td>
        <td className="UserListRow__td text-center">
          <UserStatus
            status={user.status}
            title={formattedText(`user.table.status.${user.status}`)}
          />
        </td>
        <td className="UserListRow__td text-center">
          <UserListMenuActions username={user.username} />
        </td>
      </tr>
    ));
  }

  renderTable() {
    if (this.props.users.length > 0) {
      const pagination = {
        page: this.props.page,
        perPage: this.props.pageSize,
        perPageOptions: [5, 10, 15, 25, 50],
      };

      return (
        <Col md={12}>
          <table className="UserListTable__table table table-striped table-bordered">
            <thead>
              <tr>
                <th><FormattedMessage id="user.table.username" /></th>
                <th><FormattedMessage id="user.table.fullName" /></th>
                <th><FormattedMessage id="user.table.email" /></th>
                <th className="UserListTable__th-sm text-center">
                  <FormattedMessage id="user.table.status" />
                </th>
                <th className="UserListTable__th-xs text-center">
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
          <strong><FormattedMessage id="user.listEmpty" /></strong>
        </Alert>
      </Col>
    );
  }

  render() {
    return (
      <div className="UserListTable">
        <Spinner loading={!!this.props.loading} >
          {this.renderTable()}
        </Spinner>
      </div>
    );
  }
}

UserListTable.propTypes = {
  onWillMount: PropTypes.func,
  loading: PropTypes.bool,
  users: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

UserListTable.defaultProps = {
  onWillMount: () => {},
  loading: false,
  users: [],
};

export default UserListTable;
