import React from 'react';
import { Row, Col } from 'patternfly-react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { getSelectedRegistry } from 'state/component-repository/hub/selectors';
import { getECRSearchFilterType } from 'state/component-repository/components/selectors';

import SidebarContainer from 'ui/component-repository/SidebarContainer';
import SearchBarContainer from 'ui/component-repository/components/SearchBarContainer';
import FilterTypeContainer from 'ui/component-repository/components/FilterTypeContainer';
import ComponentListContainer from 'ui/component-repository/components/list/ComponentListContainer';
import ComponentListViewModeSwitcherContainer from 'ui/component-repository/components/list/ComponentListViewModeSwitcherContainer';
import ExtraTabBarFilterContainer from 'ui/component-repository/ExtraTabBarFilterContainer';
import HubRegistrySwitcher from 'ui/component-repository/components/list/HubRegistrySwitcher';
import { ECR_LOCAL_REGISTRY_NAME } from 'state/component-repository/hub/reducer';
import BundleGroupAutoComplete from 'ui/component-repository/components/BundleGroupAutoComplete';

export const BUNDLE_GROUP_ID = 'bundleGroup';

const HUB_FILTER_TYPES = [
  {
    id: 'name',
    title: 'Name',
    filterType: 'text',
  },
  {
    id: 'organizationName',
    title: 'Organization Name',
    filterType: 'text',
  },
  {
    id: BUNDLE_GROUP_ID,
    title: 'Bundle Group',
    filterType: 'text',
  },
];

const ComponentListWrapper = () => {
  const activeRegistry = useSelector(getSelectedRegistry);
  const filterType = useSelector(getECRSearchFilterType);
  const isLocalRegistry = activeRegistry.name === ECR_LOCAL_REGISTRY_NAME;
  return (
    <div className="ComponentListPage__body">
      <HubRegistrySwitcher />
      <Row>
        {
          isLocalRegistry && (
            <Col md={3}>
              <SidebarContainer />
            </Col>
          )
        }
        <Col md={isLocalRegistry ? 9 : 12}>
          <div className="ComponentListPage__container">
            <div className="ComponentListPage__container-header">
              <div className="ComponentListPage__container-header-title">
                <FormattedMessage id="componentRepository.categories.component" />
              </div>
              <div className="ComponentListPage__container-header-actionbar">
                <div>
                  <FilterTypeContainer {...(!isLocalRegistry &&
                    { filterTypes: HUB_FILTER_TYPES })}
                  />
                  {
                    filterType.id === BUNDLE_GROUP_ID ? (
                      <BundleGroupAutoComplete />
                    ) : (
                      <SearchBarContainer />
                    )
                  }
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
