import React, { useEffect, useCallback } from 'react';
import { Spinner, Alert, Paginator } from 'patternfly-react';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';

import HubBundleManagementModal, { HUB_BUNDLE_MANAGEMENT_MODAL_ID } from 'ui/component-repository/components/list/HubBundleManagementModal';
import { ECR_COMPONENTS_GRID_VIEW, ECR_COMPONENT_UNINSTALLATION_STATUS_IN_PROGRESS } from 'state/component-repository/components/const';
import paginatorMessages from 'ui/paginatorMessages';
import { getCurrentPage, getPageSize, getTotalItems } from 'state/pagination/selectors';
import { getECRComponentListViewMode, getECRComponentsUninstallationStatuses } from 'state/component-repository/components/selectors';
import { fetchBundlesFromRegistry, fetchBundlesFromRegistryWithFilters, FETCH_BUNDLES_LOADING_STATE } from 'state/component-repository/hub/actions';
import { getLoading } from 'state/loading/selectors';
import { getBundlesFromRegistry, getBundleStatuses, getSelectedRegistry, getBundleGroups } from 'state/component-repository/hub/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import BundleListGridView from 'ui/component-repository/components/list/BundleListGridView';
import BundleListListView from 'ui/component-repository/components/list/BundleListListView';
import { getVisibleModal } from 'state/modal/selectors';


const HubBundleList = ({
  intl,
}) => {
  const dispatch = useDispatch();
  const activeRegistry = useSelector(getSelectedRegistry);
  const loading = useSelector(getLoading)[FETCH_BUNDLES_LOADING_STATE];
  const page = useSelector(getCurrentPage);
  const perPage = useSelector(getPageSize);
  const totalItems = useSelector(getTotalItems);
  const viewMode = useSelector(getECRComponentListViewMode);
  const pagination = {
    page,
    perPage,
    perPageOptions: [5, 10, 15, 25, 50],
  };
  const bundles = useSelector(getBundlesFromRegistry);
  const bundleStatuses = useSelector(getBundleStatuses);
  const openedModal = useSelector(getVisibleModal);
  const bundleGroups = useSelector(getBundleGroups);
  const componentUninstallationStatuses = useSelector(getECRComponentsUninstallationStatuses);

  useEffect(
    () => { dispatch(fetchBundlesFromRegistry(activeRegistry.id)); },
    [activeRegistry.id, dispatch],
  );

  const changePage = useCallback((newPage) => {
    dispatch(fetchBundlesFromRegistryWithFilters(
      activeRegistry.id,
      { page: newPage, pageSize: perPage },
    ));
  }, [activeRegistry.id, dispatch, perPage]);

  const changePageSize = useCallback((newPageSize) => {
    dispatch(fetchBundlesFromRegistryWithFilters(
      activeRegistry.id,
      { page: 1, pageSize: newPageSize },
    ));
  }, [activeRegistry.id, dispatch]);

  const openComponentManagementModal = useCallback((component) => {
    if (componentUninstallationStatuses[component.code] ===
      ECR_COMPONENT_UNINSTALLATION_STATUS_IN_PROGRESS) {
      dispatch(setVisibleModal(`uninstall-manager-for-${component.code}`));
      return;
    }
    dispatch(setInfo({ type: 'Component', payload: component }));
    dispatch(setVisibleModal(HUB_BUNDLE_MANAGEMENT_MODAL_ID));
  }, [componentUninstallationStatuses, dispatch]);

  const renderComponents = (viewMode === ECR_COMPONENTS_GRID_VIEW)
    ? (<BundleListGridView
        bundles={bundles}
        locale={intl.locale}
        openComponentManagementModal={openComponentManagementModal}
        bundleStatuses={bundleStatuses}
        bundleGroups={bundleGroups}
    />)
    : (<BundleListListView
        bundles={bundles}
        locale={intl.locale}
        openComponentManagementModal={openComponentManagementModal}
        bundleStatuses={bundleStatuses}
        bundleGroups={bundleGroups}
    />);

  const components = (!bundles
    || bundles.length === 0)
    ?
    (
      <Alert type="info">
        <FormattedMessage id="componentRepository.components.notFound" />
      </Alert>)
    : renderComponents;


  const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
    { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
  ), {});

  return (
    <div className="ComponentList">
      <Spinner loading={!!loading} >
        {components}
        <Paginator
          viewType="table"
          pagination={pagination}
          itemCount={totalItems}
          onPageSet={changePage}
          onPerPageSelect={changePageSize}
          messages={messages}
        />
        {openedModal === HUB_BUNDLE_MANAGEMENT_MODAL_ID && <HubBundleManagementModal />}
      </Spinner>
    </div>
  );
};

HubBundleList.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(HubBundleList);
