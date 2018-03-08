import { connect } from 'react-redux';
import { fetchDataModelList } from 'state/data-model-list/actions';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import DataModelListTable from 'ui/data-models/list/DataModelListTable';
import { getListDataModels } from 'state/data-model-list/selectors';


export const mapStateToProps = state => (
  {
    dataModels: getListDataModels(state),
    page: getCurrentPage(state),
    totalItems: getTotalItems(state),
    pageSize: getPageSize(state),
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataModelList());
  },
});

const DataModelListTableContainer =
 connect(mapStateToProps, mapDispatchToProps)(DataModelListTable);
export default DataModelListTableContainer;
