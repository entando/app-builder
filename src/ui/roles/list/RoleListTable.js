import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Alert, Spinner } from 'patternfly-react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import RoleListMenuActions from 'ui/roles/list/RoleListMenuActions';
import DeleteUserRoleModalContainer from 'ui/roles/common/DeleteUserRoleModalContainer';
import UserTable from 'ui/users/common/UserTable';

class RoleListTable extends Component {
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
      roles, page, pageSize, intl,
    } = this.props;

    if (roles.length > 0) {
      const pagination = { page, perPage: pageSize, perPageOptions: [5, 10, 15, 25, 50] };

      const columns = [
        { title: 'app.name', field: 'name', className: 'RoleListTable__th-lg' },
        { title: 'app.code', field: 'code', className: 'RoleListTable__th-lg' },
        {
          title: '',
          field: 'actions',
          className: 'RoleListTable__th-xs text-center',
          render: props => (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <RoleListMenuActions
                code={props.code}
                onClickDelete={this.props.onClickDelete}
              />
            </div>
          ),
        },
      ];

      return (
        <div>
          <UserTable
            intl={intl}
            columns={columns}
            rows={roles}
            pagination={pagination}
            totalItems={this.props.totalItems}
            onChangePage={this.changePage}
            onChangePageSize={this.changePageSize}
          />
        </div>
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
          <DeleteUserRoleModalContainer {...this.props} />
        </Spinner>
      </div>
    );
  }
}

RoleListTable.propTypes = {
  intl: intlShape.isRequired,
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

export default injectIntl(RoleListTable);
