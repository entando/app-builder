import { connect } from 'react-redux';
import { fetchDataTypeAttribute } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import { getSelectedDataTypeAttributeIdList } from 'state/data-types/selectors';
import AttributeForm from 'ui/common/form/AttributeForm';

export const mapStateToProps = (state) => {
  console.log('STATE', getSelectedDataTypeAttributeIdList(state).allowedRoles || []);
  console.log('attribute', formValueSelector('Attribute')(state, 'allowedRoles'));

  return {
    dataTypeAttributeCode: formValueSelector('DataType')(state, 'type'),
    allowedRoles: formValueSelector('Attribute')(state, 'allowedRoles'),
    selectJoinAllowedOptions: formValueSelector('Attribute')(state, 'allowedRoles'),
  };
};

export const mapDispatchToProps = dispatch => ({
  onWillMount: (dataTypeAttributeCode) => {
    dispatch(fetchDataTypeAttribute(dataTypeAttributeCode));
  },
  handleSubmit: values => (values),

});
const DataTypeFormContainer = connect(mapStateToProps, mapDispatchToProps)(AttributeForm);
export default DataTypeFormContainer;
