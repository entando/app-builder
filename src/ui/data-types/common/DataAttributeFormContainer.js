import { connect } from 'react-redux';
import { fetchDataTypeAttribute } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
// inset getAttributes
import { getSelectedDataTypeAttributeIdList } from 'state/data-types/selectors';
import AttributeForm from 'ui/common/form/AttributeForm';

export const mapStateToProps = state => ({
  attribute: getSelectedDataTypeAttributeIdList(state),
  dataTypeAttributeCode: formValueSelector('DataType')(state, 'type'),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (dataTypeAttributeCode) => {
    console.log(dataTypeAttributeCode);
    dispatch(fetchDataTypeAttribute(dataTypeAttributeCode));
  },
  handleSubmit: values => (values),

});
const DataTypeFormContainer = connect(mapStateToProps, mapDispatchToProps)(AttributeForm);
export default DataTypeFormContainer;
