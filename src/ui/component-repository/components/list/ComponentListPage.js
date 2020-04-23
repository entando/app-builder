import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import SidebarContainer from 'ui/component-repository/SidebarContainer';
import SearchBarContainer from 'ui/component-repository/components/SearchBarContainer';
import CategoryTabBarFilterContainer from 'ui/component-repository/CategoryTabBarFilterContainer';
import ComponentListContainer from 'ui/component-repository/components/list/ComponentListContainer';
import ComponentListViewModeSwitcherContainer from 'ui/component-repository/components/common/ComponentListViewModeSwitcherContainer';

import { ROUTE_DE_CONFIG_LIST } from 'app-init/router';

const ComponentListPage = () => (
  <InternalPage className="ComponentListPage">
    <Grid>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="componentRepository.component.list.title"
            helpId="componentRepository.component.help"
            configLink={ROUTE_DE_CONFIG_LIST}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <CategoryTabBarFilterContainer />
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
