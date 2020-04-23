import { connect } from 'react-redux';

import { fetchECRComponents } from 'state/component-repository/components/actions';
import { getECRComponentList, getECRComponentListViewMode } from 'state/component-repository/components/selectors';
import { getLoading } from 'state/loading/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import ComponentList from 'ui/component-repository/components/list/ComponentList';
import { fetchECRComponentsFiltered } from 'state/component-repository/actions';

const ecrLoading = 'component-repository/components';

export const mapStateToProps = state => ({
  componentRepositoryComponents: getECRComponentList(state),
  viewMode: getECRComponentListViewMode(state),
  loading: getLoading(state)[ecrLoading],
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(fetchECRComponents(page));
  },
  fetchECRComponentsFiltered: (page = { page: 1, pageSize: 10 }) => {
    dispatch(fetchECRComponentsFiltered(page));
  },
});

const ComponentListContainer = connect(mapStateToProps, mapDispatchToProps)(ComponentList);

export default ComponentListContainer;
