import { connect } from 'react-redux';
import { fetchDataTypeAttributes } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import EnumeratorAttributeForm from 'ui/common/form/EnumeratorAttributeForm';
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
  JoinAllowedOptions: formValueSelector('EnumeratorAttribute')(state, 'joinRoles') || [],
  initialValues: {
    code: 'Enumerator',
  },
});
export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  handleSubmit: values => (values),

});
const DataAttributeEnumeratorFormContainer =
connect(mapStateToProps, mapDispatchToProps)(EnumeratorAttributeForm);
export default DataAttributeEnumeratorFormContainer;
