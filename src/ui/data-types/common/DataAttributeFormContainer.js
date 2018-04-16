import { connect } from 'react-redux';
import { fetchDataTypeAttributes } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import AttributeForm from 'ui/common/form/AttributeForm';
import {
  getDataTypeSelectedAttribute,
  getDataTypeAttributesIdList,
  getDataTypeSelectedAttributeAllowedRoles,
} from 'state/data-types/selectors';

export const mapStateToProps = (state) => {
  console.log('joinRoles ', formValueSelector('Attribute')(state, 'joinRoles'));

  return ({
    dataTypeAttributeCode: getDataTypeSelectedAttribute(state).type,
    attributesList: getDataTypeAttributesIdList(state),
    attributeCode: formValueSelector('DataType')(state, 'type'),
    allowedRoles: getDataTypeSelectedAttributeAllowedRoles(state),
    allowedDisablingCodes: getDataTypeSelectedAttributeAllowedRoles(state),
    JoinAllowedOptions: formValueSelector('Attribute')(state, 'joinRoles') || [],
  });
};
export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  handleSubmit: values => (values),

});
const DataTypeFormContainer = connect(mapStateToProps, mapDispatchToProps)(AttributeForm);
export default DataTypeFormContainer;
