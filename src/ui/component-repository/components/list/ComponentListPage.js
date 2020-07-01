import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import SidebarContainer from 'ui/component-repository/SidebarContainer';
import SearchBarContainer from 'ui/component-repository/components/SearchBarContainer';
import FilterTypeContainer from 'ui/component-repository/components/FilterTypeContainer';
import ComponentListContainer from 'ui/component-repository/components/list/ComponentListContainer';
import ComponentListViewModeSwitcherContainer from 'ui/component-repository/components/list/ComponentListViewModeSwitcherContainer';
import withPermissions from 'ui/auth/withPermissions';
import { ROLE_SUPERUSER } from 'state/permissions/const';
import { ROUTE_ECR_CONFIG_LIST } from 'app-init/router';

export const ComponentListPageBody = () => (
  <InternalPage className="ComponentListPage">
    <Grid>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="componentRepository.component.list.title"
            helpId="componentRepository.component.help"
            configLink={ROUTE_ECR_CONFIG_LIST}
            hideConfigLink
          />
        </Col>
      </Row>
      <Row>
        <Col md={9} style={{ display: 'flex', flexDirection: 'row' }} >
          <div style={{ flex: 1, minWidth: 100 }}>
            <FilterTypeContainer />
          </div>
          <div style={{ flex: 10 }}>
            <SearchBarContainer />
          </div>
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

export default withPermissions(ROLE_SUPERUSER)(ComponentListPageBody);
