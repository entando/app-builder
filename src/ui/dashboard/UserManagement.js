import React from 'react';
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

import { ROUTE_USER_ADD } from 'app-init/router';

const UserManagement = () => (
  <Card accented>
    <CardTitle>
      <Icon size="lg" name="user" />
      User Management
      <Button className="pull-right" componentClass={Link} route={ROUTE_USER_ADD} >New User</Button>
      <Clearfix />
    </CardTitle>
    <CardBody>
      <Icon size="lg" name="user" />
      <AggregateStatusCount>
        <b>100</b> users
      </AggregateStatusCount>
      <Icon size="lg" name="user" />
      <AggregateStatusCount>
        <b>20</b> groups
      </AggregateStatusCount>
    </CardBody>
  </Card>
);

export default UserManagement;
