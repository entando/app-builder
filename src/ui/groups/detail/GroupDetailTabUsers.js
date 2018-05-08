import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, Paginator, Spinner } from 'patternfly-react';
import { Table, Row, Col, Alert } from 'react-bootstrap';
import { formattedText } from '@entando/utils';

import { LinkMenuItem } from 'frontend-common-components';
import { ROUTE_USER_EDIT, ROUTE_USER_AUTHORITY } from 'app-init/router';

class GroupDetailTabUsers extends React.Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  renderRows() {
    const editUser = formattedText('app.edit');
    const authority = formattedText('group.action.manageAuthorization');
    const statusIconClass = status => (status === 'active' ? 'GroupDetailTabUsers__status-icon--active' : 'GroupDetailTabUsers__status-icon--disabled');

    return this.props.pageReferences.map(item => (
      <tr key={item.username}>
        <td>{item.fullName}</td>
        <td>{item.lastLogin}</td>
        <td>
          <i className={`${statusIconClass(item.status)}`} />
        </td>
        <td >
          <DropdownKebab id={`kebab-${item.username}`}>
            <LinkMenuItem
              id={`edit-user-${item.username}`}
              route={ROUTE_USER_EDIT}
              params={{ username: item.username }}
              label={`${editUser} ${item.fullName}`}
              className="GroupDetailTabUsers__menu-item-edit"
            />
            <LinkMenuItem
              id={`authority-${item.username}`}
              route={ROUTE_USER_AUTHORITY}
              params={{ username: item.username }}
              label={`${authority} ${item.fullName}`}
              className="GroupDetailTabUsers__menu-item-edit"
            />
          </DropdownKebab>
        </td>
      </tr>
    ));
  }

  renderTable() {
    if (this.props.pageReferences.length > 0) {
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
                <th><FormattedMessage id="user.table.status" /></th>
                <th width={30}> <FormattedMessage id="app.actions" /></th>
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
  pageReferences: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string,
    fullName: PropTypes.string,
    lastLogin: PropTypes.string,
    status: PropTypes.string,
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

GroupDetailTabUsers.defaultProps = {
  onWillMount: () => {},
  loading: false,
  pageReferences: [],
};

export default GroupDetailTabUsers;
