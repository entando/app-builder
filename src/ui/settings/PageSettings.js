import React from 'react';
// import PropTypes from 'prop-types';
import InternalPage from 'ui/internal-page/InternalPage';
import { FormattedMessage } from 'react-intl';
import PageTitle from 'ui/internal-page/PageTitle';
import PageSettingsForm from 'ui/settings/PageSettingsForm';

import { Grid, Col, Row, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';


const PageSettings = () => (
  <InternalPage className="PageSettings">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem route="home" active>
              <FormattedMessage id="menu.pageDesigner" />
            </BreadcrumbItem>
            <BreadcrumbItem route="fragment">
              <FormattedMessage id="menu.pageSettings" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <PageTitle
        titleId="PageSettings.title"
        helpId="PageSettings.help"
      />
      <Row>
        <Col xs={12}>
          <PageSettingsForm />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);


export default PageSettings;
