import { connect } from 'react-redux';

import { fetchECRComponents } from 'state/component-repository/components/actions';
import { getECRComponentList, getECRComponentListViewMode } from 'state/component-repository/components/selectors';
import { getLoading } from 'state/loading/selectors';
import ComponentList from 'ui/component-repository/components/list/ComponentList';

const ecrLoading = 'component-repository/components';

export const mapStateToProps = state => (
  {
    componentRepositoryComponents: getECRComponentList(state),
    viewMode: getECRComponentListViewMode(state),
    loading: getLoading(state)[ecrLoading],
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(fetchECRComponents(page));
  },
});

const ComponentListContainer = connect(mapStateToProps, mapDispatchToProps)(ComponentList);

export default ComponentListContainer;
