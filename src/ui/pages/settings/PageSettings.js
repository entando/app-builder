import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Col, Row, Breadcrumb } from 'patternfly-react';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import PageSettingsFormContainer from 'ui/pages/common/PageSettingsFormContainer';


const pageSettings = () => (
  <InternalPage className="PageSettings">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem to="home" active>
              <FormattedMessage id="menu.pageDesigner" />
            </BreadcrumbItem>
            <BreadcrumbItem to="home">
              <FormattedMessage id="menu.pageSettings" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <PageTitle
        titleId="pageSettings.title"
        helpId="pageSettings.help"
      />
      <Row>
        <Col xs={12}>
          <PageSettingsFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);


export default pageSettings;
