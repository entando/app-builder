import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import PageTemplateFormContainer from 'ui/page-templates/common/PageTemplateFormContainer';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import withPermissions from 'ui/auth/withPermissions';
import { FORM_MODE_CLONE } from 'state/page-templates/const';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';
import { ROUTE_PAGE_TEMPLATE_LIST } from 'app-init/router';

export const PageTemplateClonePageBody = () => (
  <InternalPage className="PageTemplateClonePage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.pageDesigner', active: true },
      { label: 'menu.pageTemplates', to: ROUTE_PAGE_TEMPLATE_LIST },
      { label: 'app.clone', active: true },
      ]}
    />
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <PageTitle titleId="app.clone" helpId="pageTemplates.help" />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ErrorsAlertContainer />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <PageTemplateFormContainer mode={FORM_MODE_CLONE} />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default withPermissions(SUPERUSER_PERMISSION)(PageTemplateClonePageBody);
