import { connect } from 'react-redux';
import { fetchDataTypeAttributes, sendPostAttributeFromDataType } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import BooleanAttributeForm from 'ui/common/form/BooleanAttributeForm';
import {
  getDataTypeSelectedAttributeAllowedRoles,
  getDataTypeSelectedAttributeIndexable,
  getDataTypeSelectedAttributeSearchable,
} from 'state/data-types/selectors';

import { getParams } from '@entando/router';

export const mapStateToProps = state => ({
  dataTypeAttributeCode: getParams(state).entityCode,
  isSearchable: getDataTypeSelectedAttributeSearchable(state),
  isIndexable: getDataTypeSelectedAttributeIndexable(state),
  allowedRoles: getDataTypeSelectedAttributeAllowedRoles(state),
  allowedDisablingCodes: getDataTypeSelectedAttributeAllowedRoles(state),
  JoinAllowedOptions: formValueSelector('BooleanAttribute')(state, 'joinRoles') || [],
  initialValues: {
    type: 'Boolean',
  },
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  onSubmit: (values) => {
    dispatch(sendPostAttributeFromDataType(values));
  },

});
const DataAttributeBooleanFormContainer =
connect(mapStateToProps, mapDispatchToProps)(BooleanAttributeForm);
export default DataAttributeBooleanFormContainer;
