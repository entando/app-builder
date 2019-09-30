import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, Paginator, Spinner } from 'patternfly-react';
import { Table, Row, Col, Alert } from 'react-bootstrap';
import { formattedText, routeConverter } from '@entando/utils';

import { LinkMenuItem } from '@entando/menu';
import { ROUTE_USER_EDIT, ROUTE_USER_AUTHORITY } from 'app-init/router';

class GroupDetailTabUsers extends React.Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentWillMount() {
    this.props.onWillMount(this.props.page);
  }

  changePage(page) {
    this.props.onWillMount({ page, pageSize: this.props.pageSize });
  }

  changePageSize(pageSize) {
    this.props.onWillMount({ page: 1, pageSize });
  }

  renderRows() {
    const editUser = formattedText('app.edit');
    const authority = formattedText('group.action.manageAuthorization');
    const statusIconClass = status => (status === 'active' ? 'GroupDetailTabUsers__status-icon--active' : 'GroupDetailTabUsers__status-icon--disabled');

    return this.props.userReferences.map(item => (
      <tr key={item.username}>
        <td>{item.profileAttributes.fullname || item.username}</td>
        <td>{item.lastLogin}</td>
        <td className="text-center">
          <i className={`${statusIconClass(item.status)}`} />
        </td>
        <td className="text-center">
          <DropdownKebab id={`kebab-${item.username}`} pullRight>
            <LinkMenuItem
              id={`edit-user-${item.username}`}
              to={routeConverter(ROUTE_USER_EDIT, { username: item.username })}
              label={`${editUser} ${item.profileAttributes.fullname || item.username}`}
              className="GroupDetailTabUsers__menu-item-edit"
            />
            <LinkMenuItem
              id={`authority-${item.username}`}
              to={routeConverter(ROUTE_USER_AUTHORITY, { username: item.username })}
              label={`${authority} ${item.profileAttributes.fullname || item.username}`}
              className="GroupDetailTabUsers__menu-item-edit"
            />
          </DropdownKebab>
        </td>
      </tr>
    ));
  }

  renderTable() {
    if (this.props.userReferences.length > 0) {
      const pagination = {
        page: this.props.page,
        perPage: this.props.pageSize,
        perPageOptions: [5, 10, 15, 25, 50],
      };
      return (
        <div>
          <Table className="GroupDetailTabUsers__table" striped bordered condensed hover >
            <thead>
              <tr>
                <th><FormattedMessage id="user.table.username" /></th>
                <th><FormattedMessage id="user.lastLogin" /></th>
                <th className="text-center GroupDetailTabUsers__th-xs"><FormattedMessage id="user.table.status" /></th>
                <th className="text-center GroupDetailTabUsers__th-xs"> <FormattedMessage id="app.actions" /></th>
              </tr>
            </thead>
            <tbody>
              {this.renderRows()}
            </tbody>
          </Table>
          <Paginator
            pagination={pagination}
            viewType="table"
            itemCount={this.props.totalItems}
            onPageSet={this.changePage}
          />
        </div>
      );
    }
    return (
      <Row>
        <Col xs={12}>
          <Alert type="warning">
            <strong><FormattedMessage id="group.user.references.empty" /></strong>
          </Alert>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <div className="GroupDetailTabUsers">
        <Spinner loading={this.props.loading} >
          {this.renderTable()}
        </Spinner>
      </div>
    );
  }
}

GroupDetailTabUsers.propTypes = {
  onWillMount: PropTypes.func,
  loading: PropTypes.bool,
  userReferences: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string,
    fullname: PropTypes.string,
    lastLogin: PropTypes.string,
    status: PropTypes.string,
    profileAttributes: PropTypes.shape({}),
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

GroupDetailTabUsers.defaultProps = {
  onWillMount: () => {},
  loading: false,
  userReferences: [],
};

export default GroupDetailTabUsers;
