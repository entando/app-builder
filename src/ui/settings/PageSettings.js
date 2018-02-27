import React from 'react';
// import PropTypes from 'prop-types';
import InternalPage from 'ui/internal-page/InternalPage';
import { FormattedMessage } from 'react-intl';
import PageTitle from 'ui/internal-page/PageTitle';
import { PageSettingsForm } from 'ui/settings/PageSettingsForm';

import { Grid, Col, Row, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem, formattedText } from 'frontend-common-components';

// import 'sass/page-designer-settings/PageSettings.scss';

const PageSettings = () => (
  <InternalPage className="PageSettings">
    <Grid fluid>
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
      <PageTitle
        title={formattedText('PageSettings.title')}
        helpMessage={formattedText('PageSettings.help')}
      />
      <Row>
        <PageSettingsForm />
      </Row>
    </Grid>
  </InternalPage>
);


export default PageSettings;
