import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import SettingsEditFormContainer from 'ui/component-repository/settings/edit/SettingsEditFormContainer';

const SettingsEditPage = () => (
  <InternalPage className="SettingsEditPage">
    <Grid>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="componentRepository.settings.title"
            helpId="componentRepository.settings.help"
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <SettingsEditFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default SettingsEditPage;
