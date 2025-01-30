import React from 'react';
import { Grid, Row, Col, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import GroupListTableContainer from 'ui/groups/list/GroupListTableContainer';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import { ROUTE_GROUP_ADD } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

export const ListGroupPageBody = () => (
  <InternalPage className="ListGroupPage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.userManagement' },
      { label: 'menu.groups', active: true },
    ]}
    />
    <Grid fluid>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="menu.groups"
            helpId="group.help"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ErrorsAlertContainer />
        </Col>
      </Row>
      <Row>
        <GroupListTableContainer />
      </Row>
      <br />
      <Row>
        <Col md={12}>
          <Link to={ROUTE_GROUP_ADD}>
            <Button
              type="button"
              className="pull-right ListGroupPage__add"
              bsStyle="primary"
              role="button"
            >
              <FormattedMessage
                id="app.add"
              />
            </Button>
          </Link>
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default withPermissions(SUPERUSER_PERMISSION)(ListGroupPageBody);
