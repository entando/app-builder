import React from 'react';
import { Grid, Row, Col, Button, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { BreadcrumbItem, Link } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
// import DatabaseListTableContainer from 'ui/database/list/DatabaseListTableContainer';
import DatabaseListTable from 'ui/database/list/DatabaseListTable';

import { ROUTE_DATABASE_LIST } from 'app-init/router';

const DatabaseListPage = () => (
  <InternalPage className="DatabaseListPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.configuration" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.database" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="menu.database"
            helpId="database.help"
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Link route={ROUTE_DATABASE_LIST}>
            <Button
              type="button"
              className="pull-right DatabaseListPage__add"
              bsStyle="primary"
            >
              <FormattedMessage
                id="database.list.add"
              />
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <DatabaseListTable />
      </Row>
    </Grid>
  </InternalPage>
);

export default DatabaseListPage;
