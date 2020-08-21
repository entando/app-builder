import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import PasswordFormContainer from 'ui/users/my-profile/PasswordFormContainer';
import MyProfileEditFormContainer from 'ui/users/my-profile/MyProfileEditFormContainer';

const MyProfilePage = () => (

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
        helpId="user.myProfile.help"
      />
      <Row>
        <Col xs={12}>
          <ErrorsAlertContainer />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <PasswordFormContainer />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <MyProfileEditFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);


export default MyProfilePage;
