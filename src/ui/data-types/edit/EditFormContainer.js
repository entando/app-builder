import { connect } from 'react-redux';
import { getParams } from 'frontend-common-components';
import { fetchDataType } from 'state/data-types/actions';
import { getDataTypeList, getDataTypesMap } from 'state/data-types/selectors';
import DataTypeForm from 'ui/data-types/common/DataTypeForm';

export const mapStateToProps = state => ({
  dataTypes: getDataTypeList(state),
  dataTypeCode: getParams(state).datatypeCode,
  dataType: getDataTypesMap(state)[getParams(state).datatypeCode],
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ dataTypeCode }) => { dispatch(fetchDataType(dataTypeCode)); },
  handleSubmit: values => (values),

});
const DataTypeFormContainer = connect(mapStateToProps, mapDispatchToProps)(DataTypeForm);
export default DataTypeFormContainer;
