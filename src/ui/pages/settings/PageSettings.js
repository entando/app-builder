import React from 'react';
// import PropTypes from 'prop-types';
import InternalPage from 'ui/internal-page/InternalPage';
import { FormattedMessage } from 'react-intl';
import PageTitle from 'ui/internal-page/PageTitle';
import PageSettingsFormContainer from 'ui/pages/common/PageSettingsFormContainer';

import { Grid, Col, Row, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';


const pageSettings = () => (
  <InternalPage className="PageSettings">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem route="home" active>
              <FormattedMessage id="menu.pageDesigner" />
            </BreadcrumbItem>
            <BreadcrumbItem route="home">
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
