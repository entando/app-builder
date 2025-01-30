import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';

import PageTitle from 'ui/internal-page/PageTitle';
import InternalPage from 'ui/internal-page/InternalPage';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import NewUserWidgetFormContainer from 'ui/widgets/newUserWidget/NewUserWidgetFormContainer';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import { ROUTE_WIDGET_LIST } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

export const NewUserWidgetPageBody = () => (
  <InternalPage className="AddWidgetPage EditWidgetPage WidgetPage">
    <HeaderBreadcrumb breadcrumbs={[
        { label: 'menu.uxComponents' },
        { label: 'menu.uxComponents.widget', to: ROUTE_WIDGET_LIST },
        { label: 'app.add', active: true },
      ]}
    />
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <PageTitle titleId="app.add" helpId="widget.help" >
            <div id="widget-button-holder" />
          </PageTitle>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ErrorsAlertContainer />
          <NewUserWidgetFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default withPermissions(SUPERUSER_PERMISSION)(NewUserWidgetPageBody);
