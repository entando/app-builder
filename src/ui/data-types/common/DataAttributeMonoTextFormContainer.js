import { connect } from 'react-redux';
import { fetchDataTypeAttributes } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import MonoTextAttributeForm from 'ui/common/form/MonoTextAttributeForm';
import {
  getDataTypeSelectedAttribute,
  getDataTypeAttributesIdList,
  getDataTypeSelectedAttributeAllowedRoles,
} from 'state/data-types/selectors';

export const mapStateToProps = state => ({
  dataTypeAttributeCode: getDataTypeSelectedAttribute(state).type,
  attributesList: getDataTypeAttributesIdList(state),
  attributeCode: formValueSelector('DataType')(state, 'type'),
  allowedRoles: getDataTypeSelectedAttributeAllowedRoles(state),
  allowedDisablingCodes: getDataTypeSelectedAttributeAllowedRoles(state),
  JoinAllowedOptions: formValueSelector('MonoTextAttribute')(state, 'joinRoles') || [],
});
export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  handleSubmit: values => (values),

});
const DataTypeFormContainer = connect(mapStateToProps, mapDispatchToProps)(MonoTextAttributeForm);
export default DataTypeFormContainer;
