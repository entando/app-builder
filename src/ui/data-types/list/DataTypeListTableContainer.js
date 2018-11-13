import { connect } from 'react-redux';

import { fetchDataTypes, sendPostRefreshDataTypes } from 'state/data-types/actions';
import { setVisibleModal, setInfo } from 'state/modal/actions';

import { getDataTypeList } from 'state/data-types/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getLoading } from 'state/loading/selectors';

import DataTypeListTable from 'ui/data-types/list/DataTypeListTable';
import { MODAL_ID } from 'ui/data-types/common/DeleteDataTypeModal';

export const mapStateToProps = state => (
  {
    datatypes: getDataTypeList(state),
    page: getCurrentPage(state),
    totalItems: getTotalItems(state),
    pageSize: getPageSize(state),
    loading: getLoading(state).dataTypes,
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(fetchDataTypes(page));
  },
  onClickDelete: (code) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'DataType', code }));
  },
  onClickReload: (code) => {
    dispatch(sendPostRefreshDataTypes(code));
  },
});

const DataTypeListTableContainer = connect(mapStateToProps, mapDispatchToProps)(DataTypeListTable);

export default DataTypeListTableContainer;
