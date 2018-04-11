import { connect } from 'react-redux';
import { fetchDataTypeAttribute } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import { getSelectedDataTypeAttributeIdList } from 'state/data-types/selectors';
import AttributeForm from 'ui/common/form/AttributeForm';

export const mapStateToProps = (state) => {
  console.log('TEST', formValueSelector('DataType')(state, 'type'));
  // console.log('TEST', formValueSelector('Attribute')(state, 'allowedRoles'));

  return {
    attribute: getSelectedDataTypeAttributeIdList(state),
    dataTypeAttributeCode: formValueSelector('DataType')(state, 'type'),
    allowedRoles: getSelectedDataTypeAttributeIdList(state),
    // selectedJoinAllowedOtions: formValueSelector('Attribute')(state, 'allowedRoles'),
  };
};

export const mapDispatchToProps = dispatch => ({
  onWillMount: (dataTypeAttributeCode) => {
    // console.log(attribute);
    dispatch(fetchDataTypeAttribute(dataTypeAttributeCode));
  },
  handleSubmit: values => (values),

});
const DataTypeFormContainer = connect(mapStateToProps, mapDispatchToProps)(AttributeForm);
export default DataTypeFormContainer;
