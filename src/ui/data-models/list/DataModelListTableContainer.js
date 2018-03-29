import { connect } from 'react-redux';
import { fetchDataModelListPaged } from 'state/data-models/actions';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import DataModelListTable from 'ui/data-models/list/DataModelListTable';
import { getListDataModels } from 'state/data-models/selectors';
import { getLoading } from 'state/loading/selectors';


export const mapStateToProps = state => (
  {
    dataModels: getListDataModels(state),
    page: getCurrentPage(state),
    totalItems: getTotalItems(state),
    pageSize: getPageSize(state),
    loading: getLoading(state).dataModel,
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page) => {
    dispatch(fetchDataModelListPaged(page));
  },
});

const DataModelListTableContainer =
 connect(mapStateToProps, mapDispatchToProps)(DataModelListTable);
export default DataModelListTableContainer;
