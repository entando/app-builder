import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { getSelectedRegistry } from 'state/component-repository/hub/selectors';

import SearchBarContainer from 'ui/component-repository/components/SearchBarContainer';
import FilterTypeContainer from 'ui/component-repository/components/FilterTypeContainer';
import ComponentListViewModeSwitcherContainer from 'ui/component-repository/components/list/ComponentListViewModeSwitcherContainer';
import ExtraTabBarFilterContainer from 'ui/component-repository/ExtraTabBarFilterContainer';
import { ECR_LOCAL_REGISTRY_NAME } from 'state/component-repository/hub/reducer';
import BundleGroupAutoCompleteContainer from 'ui/component-repository/components/BundleGroupAutoCompleteContainer';
import { getLoading } from 'state/loading/selectors';
import { fetchBundlesFromRegistryWithFilters, fetchBundleGroups, FETCH_BUNDLES_LOADING_STATE } from 'state/component-repository/hub/actions';
import { getPageSize } from 'state/pagination/selectors';
import Button from 'ui/common/Button';
import CategoryFilterContainer from 'ui/component-repository/CategoryFilterContainer';

export const BUNDLE_GROUP_FILTER_ID = 'bundleGroup';

const ComponentListActionsWrapper = () => {
  const dispatch = useDispatch();
  const activeRegistry = useSelector(getSelectedRegistry);
  const isLocalRegistry = activeRegistry.name === ECR_LOCAL_REGISTRY_NAME;
  const loading = useSelector(getLoading)[FETCH_BUNDLES_LOADING_STATE];
  const perPage = useSelector(getPageSize);
  const handleRefreshBundles = () => {
    dispatch(fetchBundlesFromRegistryWithFilters(
      activeRegistry.id,
      { page: 1, pageSize: perPage },
    ));
    dispatch(fetchBundleGroups(activeRegistry.id));
  };
  return (
    <div className="ComponentListActionsWrapper">
      <div className="ComponentListActions__container">
        <div className="ComponentListActions__container-header">
          <div className="ComponentListActions__container-header-title">
            {/* <FormattedMessage id="componentRepository.categories.component" /> */}
          </div>
          <div className="ComponentListActions__container-header-actionbar">
            <div className="ComponentListActions__container-bundle-group">
              {
                isLocalRegistry ? <FilterTypeContainer /> : (
                  <Button
                    key={BUNDLE_GROUP_FILTER_ID}
                    className="active ComponentListActions__bundle-filter-btn"
                  >
                    <FormattedMessage id="app.filterTypesSelect.bundleGroup" />
                  </Button>
                )
              }
              {isLocalRegistry ? <SearchBarContainer /> : <BundleGroupAutoCompleteContainer />}
            </div>
            { isLocalRegistry && (<CategoryFilterContainer />) }
            <div>
              { isLocalRegistry && <ExtraTabBarFilterContainer /> }
            </div>
            <div>
              <ComponentListViewModeSwitcherContainer />
            </div>
            { !isLocalRegistry && (
            <Button
              key="bundleRefetchButton"
              disabled={loading}
              className="ComponentListActions__refresh-button btn-primary"
              onClick={handleRefreshBundles}
            >
              <FormattedMessage id="hub.bundle.refresh" />
              <i className="fa fa-refresh ComponentListActions__refresh-icon" />
            </Button>
            )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentListActionsWrapper;
