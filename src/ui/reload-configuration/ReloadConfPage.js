import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import ReloadActionContainer from 'ui/reload-configuration/ReloadActionContainer';

const ReloadConfPage = () => (

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
          <ReloadActionContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);


export default ReloadConfPage;
