import { connect } from 'react-redux';
import { fetchDataTypeAttributes, sendPostAttributeFromDataType } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import { getParams } from '@entando/router';
import AttributeForm from 'ui/common/form/AttributeForm';
import {
  getDataTypeSelectedAttribute,
  getDataTypeSelectedAttributeCode,
  getDataTypeAttributesIdList,
  getDataTypeSelectedAttributeAllowedRoles,
} from 'state/data-types/selectors';


export const mapStateToProps = state => ({
  dataTypeAttributeCode: getParams(state).entityCode,
  joinAllowedOptions: formValueSelector('attribute')(state, 'joinRoles') || [],
  selectedAttributeType: getDataTypeSelectedAttribute(state),
  attributesList: getDataTypeAttributesIdList(state),
  initialValues: {
    type: getDataTypeSelectedAttributeCode(state),
  },
  allowedRoles: getDataTypeSelectedAttributeAllowedRoles(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
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
        code: values.code,
        type: values.listNestedType,
        enumeratorStaticItems: 'default',
        enumeratorStaticItemsSeparator: ',',
      },
    };
    dispatch(sendPostAttributeFromDataType(payload));
  },
});

const AddFormContainer =
connect(mapStateToProps, mapDispatchToProps)(AttributeForm);
export default AddFormContainer;
