import { connect } from 'react-redux';
import { fetchDataTypeAttributes, fetchDataTypeAttribute } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import MonoListAttributeForm from 'ui/common/form/MonoListAttributeForm';
import {
  getDataTypeSelectedAttributeCode,
  getDataTypeAttributesIdList,
  getDataTypeSelectedAttributeAllowedRoles,
  getDataTypeSelectedAttribute,
} from 'state/data-types/selectors';
import { gotoRoute } from 'frontend-common-components';
import { ROUTE_ATTRIBUTE_MONOLIST_ADD } from 'app-init/router';

export const mapStateToProps = (state) => {
  console.log('TEST', getDataTypeSelectedAttribute(state));
  return {
    dataTypeAttributeCode: getDataTypeSelectedAttributeCode(state),
    attributesList: getDataTypeAttributesIdList(state),
    attributeCode: formValueSelector('MonoListAttribute')(state, 'listNestedType'),
    attributeName: formValueSelector('MonoListAttribute')(state, 'attributeName'),
    allowedDisablingCodes: getDataTypeSelectedAttributeAllowedRoles(state),
    JoinAllowedOptions: formValueSelector('MonoListAttribute')(state, 'joinRoles') || [],
    allowedRoles: getDataTypeSelectedAttributeAllowedRoles(state),
    initialValues: {
      code: 'Monolist',
    },
  };
};
export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  onAddAttribute: (attributeCode, attributeName) => {
    dispatch(fetchDataTypeAttribute(attributeCode, attributeName));
    gotoRoute(ROUTE_ATTRIBUTE_MONOLIST_ADD);
  },
  handleSubmit: values => (values),

});
const DataAttributeMonoListFormContainer =
connect(mapStateToProps, mapDispatchToProps)(MonoListAttributeForm);
export default DataAttributeMonoListFormContainer;
