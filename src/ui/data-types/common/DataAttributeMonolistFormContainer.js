import { connect } from 'react-redux';
import { fetchDataTypeAttributes, fetchDataTypeAttribute } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import MonoListAttributeForm from 'ui/common/form/MonoListAttributeForm';
import {
  getDataTypeSelectedAttribute,
  getDataTypeAttributesIdList,
  getDataTypeSelectedAttributeAllowedRoles,
  // getDataTypeSelectedAttributeCode,
} from 'state/data-types/selectors';
import { gotoRoute } from 'frontend-common-components';
import { ROUTE_ATTRIBUTE_MONOLIST_ADD } from 'app-init/router';

export const mapStateToProps = state => ({
  dataTypeAttributeCode: getDataTypeSelectedAttribute(state).type,
  attributesList: getDataTypeAttributesIdList(state),
  attributeCode: formValueSelector('DataType')(state, 'type'),
  allowedRoles: getDataTypeSelectedAttributeAllowedRoles(state),
  allowedDisablingCodes: getDataTypeSelectedAttributeAllowedRoles(state),
  JoinAllowedOptions: formValueSelector('MonoListAttribute')(state, 'joinRoles') || [],
  initialValues: {
    code: 'getDataTypeSelectedAttributeCode(state)',
  },
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  onAddAttribute: (attributeCode) => {
    dispatch(fetchDataTypeAttribute(attributeCode));
    gotoRoute(ROUTE_ATTRIBUTE_MONOLIST_ADD);
  },
  handleSubmit: values => (values),

});
const DataAttributeMonoListFormContainer =
connect(mapStateToProps, mapDispatchToProps)(MonoListAttributeForm);
export default DataAttributeMonoListFormContainer;
