import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import SettingsEditFormContainer from 'ui/digital-exchange/settings/edit/SettingsEditFormContainer';

const SettingsEditPage = () => (
  <InternalPage className="SettingsEditPage">
    <Grid>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="digitalExchange.settings.title"
            helpId="digitalExchange.settings.help"
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
