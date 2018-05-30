import { connect } from 'react-redux';

import {
  fetchAttributeFromDataType,
  sendPutAttributeFromDataType,
  fetchDataTypeAttributes,
} from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import { getParams } from '@entando/router';
import EditAttributeForm from 'ui/common/form/EditAttributeForm';
import {
  getSelectedAttributeType,
  getDataTypeAttributesIdList,
  getDataTypeSelectedAttributeAllowedRoles,
} from 'state/data-types/selectors';


export const mapStateToProps = state => ({
  attributeCode: getParams(state).attributeCode,
  dataTypeAttributeCode: getParams(state).entityCode,
  joinAllowedOptions:
    formValueSelector('attribute')(state, 'joinRoles') ||
    formValueSelector('attribute')(state, 'joinAllowedOptions') || [],
  selectedAttributeType: getSelectedAttributeType(state),
  attributesList: getDataTypeAttributesIdList(state),
  allowedRoles: getDataTypeSelectedAttributeAllowedRoles(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ dataTypeAttributeCode, attributeCode }) => {
    dispatch(fetchAttributeFromDataType(dataTypeAttributeCode, attributeCode));
    dispatch(fetchDataTypeAttributes());
  },
  onSubmit: (values, allowedRoles) => {
    const payload = {
      ...values,
      code: values.code,
      type: values.type,
      roles: values.joinRoles ? values.joinRoles.map(roleId => (
        { code: roleId, descr: allowedRoles[roleId] }
      )) : [],
      nestedAttribute: {
        ...values.nestedAttribute,
        code: values.code,
        enumeratorStaticItems: 'default',
        enumeratorStaticItemsSeparator: ',',
      },
    };
    dispatch(sendPutAttributeFromDataType(payload));
  },
});

const EditFormContainer =
connect(mapStateToProps, mapDispatchToProps)(EditAttributeForm);
export default EditFormContainer;
