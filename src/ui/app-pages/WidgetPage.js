import React from 'react';
import { FormattedMessage } from 'react-intl';
import InternalPage from 'ui/internal-page/InternalPage';
import WidgetFormContainer from 'ui/widgets/WidgetFormContainer';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';

import { BreadcrumbItem } from 'frontend-common-components';

const WidgetPage = () => (
  <InternalPage className="WidgetPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem route="home" active>
              <FormattedMessage id="menu.uxPattern" />
            </BreadcrumbItem>
            <BreadcrumbItem route="widgetForm">
              Widgets
            </BreadcrumbItem>
            <BreadcrumbItem route="widgetForm" active>
              Add
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <WidgetFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default WidgetPage;
