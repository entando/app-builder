import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';

const AddUserPage = () => (

  <InternalPage className="MyProfilePage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem active>
              <FormattedMessage id="app.myProfile" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <PageTitle
        titleId="app.myProfile"
        helpId="user.help"
      />
      <Row>
        <Col xs={12}>
          asdf
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);


export default AddUserPage;
