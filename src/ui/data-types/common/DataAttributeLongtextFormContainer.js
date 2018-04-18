import { connect } from 'react-redux';
import { fetchDataTypeAttributes } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import LongTextAttributeForm from 'ui/common/form/LongTextAttributeForm';
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
  JoinAllowedOptions: formValueSelector('LongTextAttribute')(state, 'joinRoles') || [],
  initialValues: {
    code: 'LongText',
  },
});
export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  handleSubmit: values => (values),

});
const DataAttributeLongtextFormContainer =
connect(mapStateToProps, mapDispatchToProps)(LongTextAttributeForm);
export default DataAttributeLongtextFormContainer;
