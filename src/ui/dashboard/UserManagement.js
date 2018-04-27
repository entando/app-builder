import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardTitle,
  CardBody,
  AggregateStatusCount,
  Icon,
  Button,
} from 'patternfly-react';
import { Clearfix } from 'react-bootstrap';
import { Link } from '@entando/router';
import { FormattedMessage } from 'react-intl';

import { ROUTE_USER_ADD } from 'app-init/router';

class UserManagement extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    return (
      <Card accented>
        <CardTitle>
          <Icon size="lg" name="user" />
          <FormattedMessage id="menu.userManagement" />
          <Button className="pull-right" componentClass={Link} route={ROUTE_USER_ADD} >
            <FormattedMessage id="dashboard.newUser" />
          </Button>
          <Clearfix />
        </CardTitle>
        <CardBody>
          <Icon size="lg" name="user" />
          <AggregateStatusCount>
            <b>{this.props.users}</b> <FormattedMessage id="menu.users" />
          </AggregateStatusCount>
          <Icon size="lg" name="user" />
          <AggregateStatusCount>
            <b>{this.props.groups}</b> <FormattedMessage id="menu.groups" />
          </AggregateStatusCount>
        </CardBody>
      </Card>
    );
  }
}

UserManagement.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  users: PropTypes.number.isRequired,
  groups: PropTypes.number.isRequired,
};

export default UserManagement;
