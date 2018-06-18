import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import PageTitle from 'ui/internal-page/PageTitle';
import InternalPage from 'ui/internal-page/InternalPage';
import WidgetFormContainer from 'ui/widgets/common/WidgetFormContainer';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import { ROUTE_WIDGET_LIST } from 'app-init/router';


const AddWidgetPage = () => (
  <InternalPage className="AddWidgetPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.uxPattern" />
            </BreadcrumbItem>
            <BreadcrumbItem route={ROUTE_WIDGET_LIST}>
              <FormattedMessage id="menu.uxPattern.widget" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="app.add" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <PageTitle titleId="app.add" helpId="widget.help" />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ErrorsAlertContainer />
          <WidgetFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default AddWidgetPage;
