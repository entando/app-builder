import { connect } from 'react-redux';
import { fetchDataTypeAttribute } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import { getDataTypeSelectedAttributeAllowedRoles, getDataTypeSelectedAttribute } from 'state/data-types/selectors';
import AttributeForm from 'ui/common/form/AttributeForm';

export const mapStateToProps = (state) => {
  console.log('seleted attributes', getDataTypeSelectedAttributeAllowedRoles(state));
  console.log('selected type', getDataTypeSelectedAttribute(state));
  return ({
    test: getDataTypeSelectedAttribute(state),
    dataTypeAttributeCode: formValueSelector('DataType')(state, 'type'),
    allowedRoles: getDataTypeSelectedAttributeAllowedRoles(state),
    JoinAllowedOptions: formValueSelector('Attribute')(state, 'allowedRoles'),
  });
};
export const mapDispatchToProps = dispatch => ({
  onWillMount: (dataTypeAttributeCode, test) => {
    dispatch(fetchDataTypeAttribute(dataTypeAttributeCode, test));
  },
  handleSubmit: values => (values),

});
const DataTypeFormContainer = connect(mapStateToProps, mapDispatchToProps)(AttributeForm);
export default DataTypeFormContainer;
