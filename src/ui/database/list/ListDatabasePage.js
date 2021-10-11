import React from 'react';
import { Grid, Row, Col, Button, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import DatabaseListTableContainer from 'ui/database/list/DatabaseListTableContainer';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';
import { ROUTE_DATABASE_ADD } from 'app-init/router';

export const DatabaseListPageBody = () => (
  <InternalPage className="DatabaseListPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.settings" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.database" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <PageTitle
            titleId="menu.database"
            helpId="database.help"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Link to={ROUTE_DATABASE_ADD} className="pull-right" >
            <Button className="DatabaseListPage__add" bsStyle="primary">
              <FormattedMessage id="database.list.add" />
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <DatabaseListTableContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default withPermissions(SUPERUSER_PERMISSION)(DatabaseListPageBody);
