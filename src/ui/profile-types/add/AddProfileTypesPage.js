import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import AddFormContainer from 'ui/profile-types/add/AddFormContainer';
import { ROUTE_PROFILE_TYPE_LIST } from 'app-init/router';


const AddProfileTypesPage = () => (
  <InternalPage className="AddProfileTypesPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.profile" />
            </BreadcrumbItem>
            <BreadcrumbItem route={ROUTE_PROFILE_TYPE_LIST}>
              <FormattedMessage id="menu.profileTypes" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="app.add" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <PageTitle
        titleId="app.add"
        helpId="profileType.help"
      />
      <Row>
        <Col xs={12} >
          <AddFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default AddProfileTypesPage;
