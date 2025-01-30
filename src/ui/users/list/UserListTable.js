import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, Alert, Spinner } from 'patternfly-react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import UserListMenuActions from 'ui/users/list/UserListMenuActions';
import UserStatus from 'ui/users/common/UserStatus';
import DeleteUserModalContainer from 'ui/users/common/DeleteUserModalContainer';
import { isEmpty } from 'lodash';
import UserTable from 'ui/users/common/UserTable';

const USER_INACTIVE = 'inactive';

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

  renderTable() {
    const {
      users, page, pageSize, intl,
    } = this.props;

    if (users.length > 0) {
      const pagination = { page, perPage: pageSize, perPageOptions: [5, 10, 15, 25, 50] };

      const columns = [
        {
          title: 'user.table.username',
          field: 'username',
        },
        {
          title: 'user.table.profileType',
          field: 'profileType',
          render: props => (
            props.profileType ?
              <Fragment>
                {props.profileType.typeDescription}
                <code>{props.profileType.typeCode && props.profileType.typeCode}</code>
              </Fragment>
              : <Fragment />
          ),
        },
        {
          title: 'user.table.fullname',
          field: 'profileAttribute',
          render: props => props.profileAttributes.fullname,
        },
        {
          title: 'user.table.email',
          field: 'profileAttribute',
          render: props => props.profileAttributes.email,
        },
        {
          title: 'user.table.status',
          field: 'status',
          className: 'UserListTable__th-sm text-center',
          render: (props) => {
            let userStatus = props.status;
            if (!props.accountNotExpired && userStatus !== USER_INACTIVE) {
              userStatus = 'accountExpired';
            } else if (!props.credentialsNotExpired && userStatus !== USER_INACTIVE) {
              userStatus = 'passwordExpired';
            }
            const msgs = defineMessages({ userStatus: { id: `user.table.status.${userStatus}` } });
            return (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <UserStatus
                  status={userStatus}
                  title={intl.formatMessage(msgs.userStatus)}
                />
              </div>
            );
          },
        },
        {
          title: '',
          field: 'actions',
          className: 'UserListTable__th-xs text-center',
          render: props => (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <UserListMenuActions
                username={props.username}
                hasProfile={!isEmpty(props.profileAttributes)}
                {...this.props}
              />
            </div>
          ),
        },
      ];

      return (
        <UserTable
          intl={intl}
          columns={columns}
          rows={users}
          pagination={pagination}
          totalItems={this.props.totalItems}
          onChangePage={this.changePage}
          onChangePageSize={this.changePageSize}
        />
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
  onWillMount: () => { },
  loading: false,
  users: [],
};

export default injectIntl(UserListTable);
