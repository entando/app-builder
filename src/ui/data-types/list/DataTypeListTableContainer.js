import { connect } from 'react-redux';

import { fetchDataTypes } from 'state/data-types/actions';
import { getDataTypeList } from 'state/data-types/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import DataTypeListTable from 'ui/data-types/list/DataTypeListTable';

export const mapStateToProps = state => (
  {
    datatypes: getDataTypeList(state),
    page: getCurrentPage(state),
    totalItems: getTotalItems(state),
    pageSize: getPageSize(state),
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = 1) => {
    dispatch(fetchDataTypes(page));
  },
});

const DataTypeListTableContainer = connect(mapStateToProps, mapDispatchToProps)(DataTypeListTable);

export default DataTypeListTableContainer;
