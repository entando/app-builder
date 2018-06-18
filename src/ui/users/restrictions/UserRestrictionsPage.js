import React from 'react';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import RestrictionsFormContainer from 'ui/users/restrictions/RestrictionsFormContainer';

const UserRestrictionsPage = () => (
  <InternalPage className="UserRestrictionsPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.userManagement" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.users.restrictions" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <PageTitle
            titleId="user.restrictions.title"
            helpId="user.restrictions.help"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <RestrictionsFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default UserRestrictionsPage;
