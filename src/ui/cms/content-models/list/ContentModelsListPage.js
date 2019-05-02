import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';

const ContentModelsListPage = () => (
  <InternalPage className="ContentModelsListPage">
    <Grid>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="cms.contentModelsList.title"
            helpId="cms.contentModelsList.help"
          />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default ContentModelsListPage;
