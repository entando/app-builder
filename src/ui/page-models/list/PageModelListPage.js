import React from 'react';
import { Grid, Row, Col, Button, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { BreadcrumbItem, Link } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import PageModelListTableContainer from 'ui/page-models/list/PageModelListTableContainer';
import { ROUTE_PAGE_MODEL_ADD } from 'app-init/router';

const PageModelListPage = () => (
  <InternalPage className="PageModelListPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.uxPattern" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.pageModels" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <PageTitle
            titleId="menu.pageModels"
            helpId="pageModels.help"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Link route={ROUTE_PAGE_MODEL_ADD}>
            <Button
              type="button"
              className="pull-right PageModelListPage__add-btn"
              bsStyle="primary"
            >
              <FormattedMessage id="app.add" />
            </Button>
          </Link>
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12}>
          <PageModelListTableContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default PageModelListPage;
