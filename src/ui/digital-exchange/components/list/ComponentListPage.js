import React from 'react';
import Sidebar from 'ui/digital-exchange/Sidebar';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import ComponentListContent from 'ui/digital-exchange/components/list/ComponentListContent';


const ComponentListPage = () =>
  (
    <InternalPage className="ComponentListPage">
      <Grid>
        <Row>
          <Col md={12}>
            <PageTitle
              titleId="digital-exchange.component.list.title"
              helpId="digital-exchange.component.help"
            />
          </Col>
        </Row>
        <Row>
          <Col md={3} >
            <Sidebar />
          </Col>
          <Col md={9}>
            <ComponentListContent />
          </Col>
        </Row>
      </Grid>
    </InternalPage>
  );

export default ComponentListPage;
