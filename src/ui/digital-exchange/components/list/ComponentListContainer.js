import { connect } from 'react-redux';

import { fetchDEComponents } from 'state/digital-exchange/components/actions';
import { getDEComponentList, getDEComponentListViewMode } from 'state/digital-exchange/components/selectors';
import { getLoading } from 'state/loading/selectors';
import ComponentList from 'ui/digital-exchange/components/list/ComponentList';

const deLoading = 'digital-exchange/components';

export const mapStateToProps = state => (
  {
    digitalExchangeComponents: getDEComponentList(state),
    viewMode: getDEComponentListViewMode(state),
    loading: getLoading(state)[deLoading],
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(fetchDEComponents(page));
  },
});

const ComponentListContainer = connect(mapStateToProps, mapDispatchToProps)(ComponentList);

export default ComponentListContainer;
