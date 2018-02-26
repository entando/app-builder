import React from 'react';
import InternalPage from 'ui/internal-page/InternalPage';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';
import FragmentDetail from 'ui/fragments/FragmentDetail';

const FragmentPage = () => (

  <InternalPage className="FragmentPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem route="home" active>
              <FormattedMessage id="menu.uxPattern" />
            </BreadcrumbItem>
            <BreadcrumbItem route="fragment">
              <FormattedMessage id="menu.uxPattern.fragment" />
            </BreadcrumbItem>
            <BreadcrumbItem route="fragment" active>
              <FormattedMessage id="app.add" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <FragmentDetail />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);


export default FragmentPage;
