import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';

const ContentTypesListPage = () => (
  <InternalPage className="ContentTypesListPage">
    <Grid>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="cms.contentTypesList.title"
            helpId="cms.contentTypesList.help"
          />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default ContentTypesListPage;
