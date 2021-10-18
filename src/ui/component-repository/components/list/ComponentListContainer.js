import { connect } from 'react-redux';

import { fetchECRComponents, getInstallPlan } from 'state/component-repository/components/actions';
import { getECRComponentList, getECRComponentListViewMode } from 'state/component-repository/components/selectors';
import { getLoading } from 'state/loading/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import ComponentList from 'ui/component-repository/components/list/ComponentList';
import { fetchECRComponentsFiltered } from 'state/component-repository/actions';
import { setInfo, setVisibleModal } from 'state/modal/actions';
import { HUB_BUNDLE_MANAGEMENT_MODAL_ID } from 'ui/component-repository/components/list/HubBundleManagementModal';
import { getBundleStatuses } from 'state/component-repository/hub/selectors';
import { getVisibleModal } from 'state/modal/selectors';

const ecrLoading = 'component-repository/components';

export const mapStateToProps = state => ({
  componentRepositoryComponents: getECRComponentList(state),
  viewMode: getECRComponentListViewMode(state),
  loading: getLoading(state)[ecrLoading],
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
  bundleStatuses: getBundleStatuses(state),
  openedModal: getVisibleModal(state),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(fetchECRComponents(page));
  },
  fetchECRComponentsFiltered: (page = { page: 1, pageSize: 10 }) => {
    dispatch(fetchECRComponentsFiltered(page));
  },
  getInstallPlan: (code) => {
    dispatch(getInstallPlan(code));
  },
  openComponentManagementModal: (component) => {
    dispatch(setInfo({ type: 'Component', payload: component }));
    dispatch(setVisibleModal(HUB_BUNDLE_MANAGEMENT_MODAL_ID));
  },
});

const ComponentListContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {
      pure: false,
    },
  )(ComponentList);

export default ComponentListContainer;
