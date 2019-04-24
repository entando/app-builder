import React from 'react';
import SidebarContainer from 'ui/digital-exchange/SidebarContainer';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import CategoryTabsContainer from 'ui/digital-exchange/CategoryTabsContainer';
import ComponentListContainer from 'ui/digital-exchange/components/list/ComponentListContainer';
import SearchBarContainer from 'ui/digital-exchange/components/SearchBarContainer';
import ComponentListViewModeSwitcherContainer from 'ui/digital-exchange/components/common/ComponentListViewModeSwitcherContainer';

import { ROUTE_DE_CONFIG_LIST } from 'app-init/router';

const ComponentListPage = () => (
  <InternalPage className="ComponentListPage">
    <Grid>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="digitalExchange.component.list.title"
            helpId="digitalExchange.component.help"
            configLink={ROUTE_DE_CONFIG_LIST}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <CategoryTabsContainer />
        </Col>
      </Row>
      <Row>
        <Col md={9} >
          <SearchBarContainer />
        </Col>
        <Col md={3} >
          <div className="pull-right">
            <ComponentListViewModeSwitcherContainer />
          </div>
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
