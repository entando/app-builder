import React from 'react';
import { Row, Col, Button } from 'patternfly-react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { getSelectedRegistry } from 'state/component-repository/hub/selectors';

import SidebarContainer from 'ui/component-repository/SidebarContainer';
import SearchBarContainer from 'ui/component-repository/components/SearchBarContainer';
import FilterTypeContainer from 'ui/component-repository/components/FilterTypeContainer';
import ComponentListContainer from 'ui/component-repository/components/list/ComponentListContainer';
import ComponentListViewModeSwitcherContainer from 'ui/component-repository/components/list/ComponentListViewModeSwitcherContainer';
import ExtraTabBarFilterContainer from 'ui/component-repository/ExtraTabBarFilterContainer';
import HubRegistrySwitcher from 'ui/component-repository/components/list/HubRegistrySwitcher';
import { ECR_LOCAL_REGISTRY_NAME } from 'state/component-repository/hub/reducer';
import BundleGroupAutoCompleteContainer from 'ui/component-repository/components/BundleGroupAutoCompleteContainer';
import HubBundleList from 'ui/component-repository/components/list/HubBundleList';
import { getLoading } from 'state/loading/selectors';
import { fetchBundlesFromRegistryWithFilters, FETCH_BUNDLES_LOADING_STATE } from 'state/component-repository/hub/actions';
import { getCurrentPage, getPageSize } from 'state/pagination/selectors';

export const BUNDLE_GROUP_FILTER_ID = 'bundleGroup';

const ComponentListWrapper = () => {
  const dispatch = useDispatch();
  const activeRegistry = useSelector(getSelectedRegistry);
  const isLocalRegistry = activeRegistry.name === ECR_LOCAL_REGISTRY_NAME;
  const loading = useSelector(getLoading)[FETCH_BUNDLES_LOADING_STATE];
  const page = useSelector(getCurrentPage);
  const perPage = useSelector(getPageSize);
  const handleRefreshBundles = () => {
    dispatch(fetchBundlesFromRegistryWithFilters(activeRegistry.url, { page, pageSize: perPage }));
  };
  return (
    <div className="ComponentListPage__body">
      <HubRegistrySwitcher />
      {
        !isLocalRegistry && (
          <Button
            key="bundleRefetchButton"
            type="button"
            bsStyle="primary"
            disabled={loading}
            className="ComponentListPage__refresh-button"
            onClick={handleRefreshBundles}
          >
            <FormattedMessage id="hub.bundle.refresh" />
            <i className="fa fa-refresh ComponentListPage__refresh-icon" />
          </Button>
        )
      }
      <Row />
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
                  {
                    isLocalRegistry ? <FilterTypeContainer /> : (
                      <Button
                        key={BUNDLE_GROUP_FILTER_ID}
                        className="active"
                      >
                        <FormattedMessage id="app.filterTypesSelect.bundleGroup" />
                      </Button>
                      )
                  }

                  {
                    isLocalRegistry ? (
                      <SearchBarContainer />
                    ) : (
                      <BundleGroupAutoCompleteContainer />
                    )
                  }
                </div>
                <div>
                  {
                    isLocalRegistry && <ExtraTabBarFilterContainer />
                  }
                </div>
                <div>
                  <ComponentListViewModeSwitcherContainer />
                </div>
              </div>
            </div>
            <div className="ComponentListPage__container-body">
              {
                isLocalRegistry ? <ComponentListContainer /> : <HubBundleList />
              }
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ComponentListWrapper;
