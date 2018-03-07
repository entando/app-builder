import React from 'react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import { Grid, Row, Col } from 'patternfly-react';
import { FragmentSearchFormContainer } from 'ui/fragments/list/FragmentSearchFormContainer';

const FragmentPage = () => (
  <InternalPage className="ListWidgetPage">
    <Grid fluid>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="widget.list.title"
            helpId="widget.help"
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Row>
            <Col md={6} mdOffset={3}>
              <FragmentSearchFormContainer />
            </Col>
          </Row>
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default FragmentPage;
