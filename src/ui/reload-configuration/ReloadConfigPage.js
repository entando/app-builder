import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import ReloadConfigContainer from 'ui/reload-configuration/ReloadConfigContainer';
import withPermissions from 'ui/auth/withPermissions';
import { ROLE_SUPERUSER } from 'state/permissions/const';

export const ReloadConfigPageBody = () => (

  <InternalPage className="ReloadConfPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.configuration" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.reloadConfiguration" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <PageTitle
        titleId="reloadConfiguration.title"
        helpId="reloadConfiguration.help"
      />
      <Row>
        <Col xs={12}>
          <ReloadConfigContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);


export default withPermissions(ROLE_SUPERUSER)(ReloadConfigPageBody);
