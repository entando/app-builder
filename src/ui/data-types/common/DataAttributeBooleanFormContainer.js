import { connect } from 'react-redux';
import { fetchDataTypeAttributes, postAttributeFromDataType } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import BooleanAttributeForm from 'ui/common/form/BooleanAttributeForm';
import {
  getDataTypeAttributesIdList,
  getDataTypeSelectedAttributeAllowedRoles,
  getDataTypeSelectedAttributeCode,
} from 'state/data-types/selectors';

import { getParams } from 'frontend-common-components';

export const mapStateToProps = (state) => {
  console.log('test', getDataTypeSelectedAttributeCode(state));
  return {
    dataTypeAttributeCode: getParams(state).entityCode,
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
  handleSubmit: (values) => {
    dispatch(postAttributeFromDataType(values));
  },

});
const DataAttributeBooleanFormContainer =
connect(mapStateToProps, mapDispatchToProps)(BooleanAttributeForm);
export default DataAttributeBooleanFormContainer;
