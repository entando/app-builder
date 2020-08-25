import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Paginator, Alert, Spinner } from 'patternfly-react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import UserListMenuActions from 'ui/users/list/UserListMenuActions';
import UserStatus from 'ui/users/common/UserStatus';
import DeleteUserModalContainer from 'ui/users/common/DeleteUserModalContainer';
import { isEmpty } from 'lodash';
import paginatorMessages from 'ui/paginatorMessages';

class UserListTable extends Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentWillMount() {
    this.props.onWillMount();
  }

  changePage(page) {
    this.props.onWillMount({ page, pageSize: this.props.pageSize });
  }

  changePageSize(pageSize) {
    this.props.onWillMount({ page: 1, pageSize });
  }

  renderTableRows() {
    const { users, intl } = this.props;
    return users.map((user) => {
      let userStatus = user.status;
      if (!user.accountNotExpired) {
        userStatus = 'accountExpired';
      } else if (!user.credentialsNotExpired) {
        userStatus = 'passwordExpired';
      }
      const msgs = defineMessages({
        userStatus: {
          id: `user.table.status.${userStatus}`,
        },
      });
      const profileType = user.profileType || {};
      return (
        <tr key={user.username}>
          <td className="UserListRow__td">{user.username}</td>
          <td className="UserListRow__td">{profileType.typeDescription}{' '}<code>{profileType.typeCode}</code></td>
          <td className="UserListRow__td">{user.profileAttributes.fullname}</td>
          <td className="UserListRow__td">{user.profileAttributes.email}</td>
          <td className="UserListRow__td text-center">
            <UserStatus
              status={userStatus}
              title={intl.formatMessage(msgs.userStatus)}
            />
          </td>
          <td className="UserListRow__td text-center">
            <UserListMenuActions
              username={user.username}
              hasProfile={!isEmpty(user.profileAttributes)}
              {...this.props}
            />
          </td>
        </tr>
      );
    });
  }

  renderTable() {
    const {
      users, page, pageSize, intl,
    } = this.props;

    if (users.length > 0) {
      const pagination = {
        page,
        perPage: pageSize,
        perPageOptions: [5, 10, 15, 25, 50],
      };

      const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
        { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
      ), {});

      return (
        <Col xs={12}>
          <table className="UserListTable__table table table-striped table-bordered">
            <thead>
              <tr>
                <th><FormattedMessage id="user.table.username" /></th>
                <th><FormattedMessage id="user.table.profileType" /></th>
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
            onPerPageSelect={this.changePageSize}
            messages={messages}
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
        <DeleteUserModalContainer />
      </div>
    );
  }
}

UserListTable.propTypes = {
  intl: intlShape.isRequired,
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

export default injectIntl(UserListTable);
