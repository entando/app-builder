import { connect } from 'react-redux';
import { fetchDataTypeAttributes } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import ThreeStateAttributeForm from 'ui/common/form/ThreeStateAttributeForm';
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
  JoinAllowedOptions: formValueSelector('ThreeStateAttribute')(state, 'joinRoles') || [],
  initialValues: {
    code: 'Number',
  },
});
export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  handleSubmit: values => (values),

});
const DataAttributeNumberFormContainer =
connect(mapStateToProps, mapDispatchToProps)(ThreeStateAttributeForm);
export default DataAttributeNumberFormContainer;
