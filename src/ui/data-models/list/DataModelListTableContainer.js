import { connect } from 'react-redux';
import { fetchDataModelListPaged } from 'state/data-model-list/actions';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import DataModelListTable from 'ui/data-models/list/DataModelListTable';
import { getListDataModelsPaged } from 'state/data-model-list/selectors';


export const mapStateToProps = state => (
  {
    dataModels: getListDataModelsPaged(state),
    page: getCurrentPage(state),
    totalItems: getTotalItems(state),
    pageSize: getPageSize(state),
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = 1) => {
    dispatch(fetchDataModelListPaged(page));
  },
});

const DataModelListTableContainer =
 connect(mapStateToProps, mapDispatchToProps)(DataModelListTable);
export default DataModelListTableContainer;
