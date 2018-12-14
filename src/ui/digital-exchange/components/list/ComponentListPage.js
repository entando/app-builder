import React from 'react';
import SidebarContainer from 'ui/digital-exchange/SidebarContainer';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import CategoryTabsContainer from 'ui/digital-exchange/CategoryTabsContainer';
import ComponentListContainer from 'ui/digital-exchange/components/list/ComponentListContainer';

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
          <Col md={12}>
            <CategoryTabsContainer />
          </Col>
        </Row>
        <Row>
          <Col md={3} >
            <SidebarContainer />
          </Col>
          <Col md={9}>
            <ComponentListContainer />
          </Col>
        </Row>
      </Grid>
    </InternalPage>
  );

export default ComponentListPage;
