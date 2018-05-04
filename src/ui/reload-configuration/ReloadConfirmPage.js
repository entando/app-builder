import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import ReloadConfirmContainer from 'ui/reload-configuration/ReloadConfirmContainer';
import { ROUTE_RELOAD_CONFIG } from 'app-init/router';

const ReloadConfirmPage = () => (

  <InternalPage className="ReloadConfirmPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.configuration" />
            </BreadcrumbItem>
            <BreadcrumbItem route={ROUTE_RELOAD_CONFIG}>
              <FormattedMessage id="menu.reloadConfiguration" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.reloadConfirm" />
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
          <ReloadConfirmContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);


export default ReloadConfirmPage;
