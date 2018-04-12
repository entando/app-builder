import { connect } from 'react-redux';
// import { fetchDataTypeAttribute } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import { getDataTypeSelectedAttributeAllowedRoles, getDataTypeSelectedAttribute } from 'state/data-types/selectors';
import AttributeForm from 'ui/common/form/AttributeForm';

export const mapStateToProps = (state) => {
  console.log('attributecode', formValueSelector('Attribute')(state, 'code'));
  return ({
    test: getDataTypeSelectedAttribute(state),
    dataTypeAttributeCode: getDataTypeSelectedAttribute(state).type,
    allowedRoles: getDataTypeSelectedAttributeAllowedRoles(state),
    JoinAllowedOptions: formValueSelector('Attribute')(state, 'allowedRoles'),
  });
};
export const mapDispatchToProps = () => ({
  // onWillMount: (dataTypeAttributeCode) => {
  //   dispatch(fetchDataTypeAttribute(dataTypeAttributeCode));
  // },
  handleSubmit: values => (values),

});
const DataTypeFormContainer = connect(mapStateToProps, mapDispatchToProps)(AttributeForm);
export default DataTypeFormContainer;
