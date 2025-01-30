import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import CloneFormContainer from 'ui/pages/clone/CloneFormContainer';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import { ROUTE_PAGE_TREE } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { MANAGE_PAGES_PERMISSION } from 'state/permissions/const';

export const PagesClonePageBody = () => (
  <InternalPage className="PagesClonePage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.pageDesigner', active: true },
      { label: 'menu.pageTree', to: { ROUTE_PAGE_TREE } },
      { label: 'app.clone', active: true },
    ]}
    />
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <PageTitle titleId="app.clone" helpId="pageTreePage.help" />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ErrorsAlertContainer />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <CloneFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default withPermissions(MANAGE_PAGES_PERMISSION)(PagesClonePageBody);
