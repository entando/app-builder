import React, { useEffect, useCallback, useMemo } from 'react';
import { Spinner, Alert, Paginator } from 'patternfly-react';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

import { useSelector, useDispatch } from 'react-redux';

import ComponentListGridView from 'ui/component-repository/components/list/ComponentListGridView';
import ComponentListListView from 'ui/component-repository/components/list/ComponentListListView';
import HubBundleManagementModal, { HUB_BUNDLE_MANAGEMENT_MODAL_ID } from 'ui/component-repository/components/list/HubBundleManagementModal';

import { ECR_COMPONENTS_GRID_VIEW } from 'state/component-repository/components/const';
import paginatorMessages from 'ui/paginatorMessages';
import { getCurrentPage, getPageSize, getTotalItems } from 'state/pagination/selectors';
import { getECRComponentListViewMode } from 'state/component-repository/components/selectors';
import { fetchBundlesFromRegistry, fetchBundlesFromRegistryWithFilters, FETCH_BUNDLES_LOADING_STATE } from 'state/component-repository/hub/actions';
import { getLoading } from 'state/loading/selectors';
import { getBundlesFromRegistry, getDeployedBundles, getSelectedRegistry } from 'state/component-repository/hub/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';


const HubBundleList = ({
  intl,
}) => {
  const dispatch = useDispatch();
  const activeRegistry = useSelector(getSelectedRegistry);
  const deployedBundles = useSelector(getDeployedBundles);
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

  useEffect(
    () => { dispatch(fetchBundlesFromRegistry(activeRegistry.url)); },
    [activeRegistry.url, dispatch, page, perPage],
  );

  const changePage = useCallback(() => {
    dispatch(fetchBundlesFromRegistryWithFilters(activeRegistry.url, { page, pageSize: perPage }));
  }, [activeRegistry.url, dispatch, page, perPage]);

  const changePageSize = useCallback(() => {
    dispatch(fetchBundlesFromRegistryWithFilters(
      activeRegistry.url,
      { page: 1, pageSize: perPage },
    ));
  }, [activeRegistry.url, dispatch, perPage]);

  const openComponentManagementModal = (component) => {
    dispatch(setInfo({ type: 'Component', payload: component }));
    dispatch(setVisibleModal(HUB_BUNDLE_MANAGEMENT_MODAL_ID));
  };

  const filteredBundles = useMemo(
    // @TODO change bundleId to id/code when payload is changed to ECR
    () => bundles.filter(bundle => !deployedBundles.find(dBundle =>
      dBundle.bundleId === bundle.bundleId)),
    [bundles, deployedBundles],
  );


  const renderComponents = (viewMode === ECR_COMPONENTS_GRID_VIEW)
    ? (<ComponentListGridView
      components={filteredBundles}
      locale={intl.locale}
      openComponentManagementModal={openComponentManagementModal}
    />)
    : (<ComponentListListView
      components={filteredBundles}
      locale={intl.locale}
      openComponentManagementModal={openComponentManagementModal}
    />);

  const components = (!filteredBundles
    || filteredBundles.length === 0)
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
          pagination={pagination}
          itemCount={totalItems}
          onPageSet={changePage}
          onPerPageSelect={changePageSize}
          messages={messages}
        />
        <HubBundleManagementModal />
      </Spinner>
    </div>
  );
};

HubBundleList.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(HubBundleList);
