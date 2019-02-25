import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import SettingsAddFormContainer from 'ui/digital-exchange/settings/add/SettingsAddFormContainer';

const SettingsAddPage = () => (
  <InternalPage className="SettingsAddPage">
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
          <SettingsAddFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default SettingsAddPage;
