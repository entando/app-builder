import { connect } from 'react-redux';
// import { fetchDataTypeAttribute } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import { getDataTypeSelectedAttributeAllowedRoles, getDataTypeSelectedAttribute } from 'state/data-types/selectors';
import AttributeForm from 'ui/common/form/AttributeForm';

export const mapStateToProps = (state) => {
  console.log('valore selezionato ', formValueSelector('Attribute')(state, 'allowedRoles'));
  return ({
    test: getDataTypeSelectedAttribute(state),
    dataTypeAttributeCode: getDataTypeSelectedAttribute(state).type,
    allowedRoles: getDataTypeSelectedAttributeAllowedRoles(state),
    allowedDisablingCodes: getDataTypeSelectedAttributeAllowedRoles(state),
    JoinAllowedOptions: formValueSelector('Attribute')(state, 'allowedRoles'),
  });
};
export const mapDispatchToProps = () => ({
  handleSubmit: values => (values),

});
const DataTypeFormContainer = connect(mapStateToProps, mapDispatchToProps)(AttributeForm);
export default DataTypeFormContainer;
