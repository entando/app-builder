import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';

const ContentSettingsPage = () => (
  <InternalPage className="ContentSettingsPage">
    <Grid>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="cms.contentSettings.title"
            helpId="cms.contentSettings.help"
          />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default ContentSettingsPage;
