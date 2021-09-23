import React from 'react';
import { Row, Col } from 'patternfly-react';
import { useDispatch } from 'react-redux';
import SidebarContainer from 'ui/component-repository/SidebarContainer';
import SearchBarContainer from 'ui/component-repository/components/SearchBarContainer';
import FilterTypeContainer from 'ui/component-repository/components/FilterTypeContainer';
import ComponentListContainer from 'ui/component-repository/components/list/ComponentListContainer';
import ComponentListViewModeSwitcherContainer from 'ui/component-repository/components/list/ComponentListViewModeSwitcherContainer';
import { FormattedMessage } from 'react-intl';
import ExtraTabBarFilterContainer from 'ui/component-repository/ExtraTabBarFilterContainer';
import HubRegistrySwitcher from 'ui/component-repository/components/list/HubRegistrySwitcher';

const ComponentListWrapper = () => {
  const dispatch = useDispatch();
  console.log('dispatch', dispatch);
  return (
    <div className="ComponentListPage__body">
      <HubRegistrySwitcher />
      <Row>
        <Col md={3}>
          <SidebarContainer />
        </Col>
        <Col md={9}>
          <div className="ComponentListPage__container">
            <div className="ComponentListPage__container-header">
              <div className="ComponentListPage__container-header-title">
                <FormattedMessage id="componentRepository.categories.component" />
              </div>
              <div className="ComponentListPage__container-header-actionbar">
                <div>
                  <FilterTypeContainer />
                  <SearchBarContainer />
                </div>
                <div>
                  <ExtraTabBarFilterContainer />
                </div>
                <div>
                  <ComponentListViewModeSwitcherContainer />
                </div>
              </div>
            </div>
            <div className="ComponentListPage__container-body">
              <ComponentListContainer />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ComponentListWrapper;
