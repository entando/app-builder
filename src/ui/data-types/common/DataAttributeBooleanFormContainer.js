import { connect } from 'react-redux';
import { fetchDataTypeAttributes } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import BooleanAttributeForm from 'ui/common/form/BooleanAttributeForm';
import {
  getDataTypeAttributesIdList,
  getDataTypeSelectedAttributeAllowedRoles,
  getDataTypeSelectedAttributeCode,
  getDataTypeSelectedAttribute,
} from 'state/data-types/selectors';

export const mapStateToProps = (state) => {
  console.log('test', getDataTypeSelectedAttributeCode(state));
  return {
    dataTypeAttributeCode: getDataTypeSelectedAttribute(state).type,
    attributesList: getDataTypeAttributesIdList(state),
    attributeCode: formValueSelector('DataType')(state, 'type'),
    allowedRoles: getDataTypeSelectedAttributeAllowedRoles(state),
    allowedDisablingCodes: getDataTypeSelectedAttributeAllowedRoles(state),
    JoinAllowedOptions: formValueSelector('BooleanAttribute')(state, 'joinRoles') || [],
    initialValues: {
      code: 'Boolean',
    },
  };
};

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  handleSubmit: values => (values),

});
const DataAttributeBooleanFormContainer =
connect(mapStateToProps, mapDispatchToProps)(BooleanAttributeForm);
export default DataAttributeBooleanFormContainer;
