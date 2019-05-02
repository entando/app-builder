import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';

const ContentListPage = () => (
  <InternalPage className="ContentListPage">
    <Grid>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="cms.contentList.title"
            helpId="cms.contentList.help"
          />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default ContentListPage;
