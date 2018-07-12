import { connect } from 'react-redux';
import DataTypeReferenceStatus from 'ui/data-types/common/DataTypeReferenceStatus';
import { fetchDataTypeReferenceStatus, sendPostDataTypeReferenceStatus } from 'state/data-types/actions';
import { getDataTypeReferencesStatus } from 'state/data-types/selectors';

export const mapStateToProps = state => ({
  status: getDataTypeReferencesStatus(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => dispatch(fetchDataTypeReferenceStatus()),
  onReload: dataTypesCodes => (dispatch(sendPostDataTypeReferenceStatus(dataTypesCodes))),
});

const DataTypeReferenceStatusContainer =
  connect(mapStateToProps, mapDispatchToProps)(DataTypeReferenceStatus);

export default DataTypeReferenceStatusContainer;
