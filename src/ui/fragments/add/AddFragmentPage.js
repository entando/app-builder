import React from 'react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';

import AddFormContainer from './AddFormContainer';

const FragmentPage = () => (

  <InternalPage className="AddFragmentPage">
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
      <PageTitle
        titleId="fragment.detail.title"
        helpId="fragment.detail.help"
      />
      <Row>
        <Col xs={12}>
          <AddFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);


export default FragmentPage;
