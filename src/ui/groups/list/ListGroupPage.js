import React from 'react';
import { Grid, Row, Col, Button, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { BreadcrumbItem, Link } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import GroupListTableContainer from 'ui/groups/list/GroupListTableContainer';
import { ROUTE_GROUP_ADD } from 'app-init/router';

const ListGroupPage = () => (
  <InternalPage className="ListGroupPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.configuration" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.groups" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="menu.groups"
            helpId="group.help"
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Link route={ROUTE_GROUP_ADD}>
            <Button
              type="button"
              className="pull-right ListGroupPage__add"
              bsStyle="primary"
            >
              <FormattedMessage
                id="app.add"
              />
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <GroupListTableContainer />
      </Row>
    </Grid>
  </InternalPage>
);

export default ListGroupPage;
