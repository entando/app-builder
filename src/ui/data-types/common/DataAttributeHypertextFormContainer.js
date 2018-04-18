import { connect } from 'react-redux';
import { fetchDataTypeAttributes, fetchDataTypeAttribute } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import HyperTextAttributeForm from 'ui/common/form/HyperTextAttributeForm';
import {
  getDataTypeSelectedAttribute,
  getDataTypeAttributesIdList,
  getDataTypeSelectedAttributeAllowedRoles,
} from 'state/data-types/selectors';
import { ROUTE_ATTRIBUTE_ADD } from 'app-init/router';
import { gotoRoute } from 'frontend-common-components';

export const mapStateToProps = state => ({
  dataTypeAttributeCode: getDataTypeSelectedAttribute(state).type,
  attributesList: getDataTypeAttributesIdList(state),
  attributeCode: formValueSelector('DataType')(state, 'type'),
  allowedRoles: getDataTypeSelectedAttributeAllowedRoles(state),
  allowedDisablingCodes: getDataTypeSelectedAttributeAllowedRoles(state),
  JoinAllowedOptions: formValueSelector('HyperTextAttribute')(state, 'joinRoles') || [],
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  onAddAttribute: (attributeCode) => {
    dispatch(fetchDataTypeAttribute(attributeCode));
    gotoRoute(ROUTE_ATTRIBUTE_ADD);
  },
  handleSubmit: values => (values),

});
const DataAttributeHypertextFormContainer =
 connect(mapStateToProps, mapDispatchToProps)(HyperTextAttributeForm);
export default DataAttributeHypertextFormContainer;
