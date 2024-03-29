import React from 'react';
import { Grid, Row, Col, Button, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import ProfileTypeListTableContainer from 'ui/profile-types/list/ProfileTypeListTableContainer';
import { ROUTE_PROFILE_TYPE_ADD } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

export const ListProfileTypePageBody = () => (
  <InternalPage className="ListProfileTypePage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.userManagement" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.profileTypes" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="profileType.list.title"
            helpId="profileType.help"
          />
        </Col>
      </Row>
      <Row>
        <ProfileTypeListTableContainer />
      </Row>
      <br />
      <Row>
        <Col md={12}>
          <Link to={ROUTE_PROFILE_TYPE_ADD} className="pull-right">
            <Button className="ProfileType__add" bsStyle="primary" >
              <FormattedMessage id="app.add" />
            </Button>
          </Link>
        </Col>
      </Row>
      {/* Entity references placeholder */}
    </Grid>
  </InternalPage>
);

export default withPermissions(SUPERUSER_PERMISSION)(ListProfileTypePageBody);
