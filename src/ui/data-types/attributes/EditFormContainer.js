import { connect } from 'react-redux';
import { fetchAttributeFromDataType, sendPutAttributeFromDataType } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import { getParams } from '@entando/router';
import EditAttributeForm from 'ui/common/form/EditAttributeForm';
import {
  getSelectedAttributeType,
  getDataTypeAttributesIdList,
  getDataTypeSelectedAttributeCode,
  getSelectedAttributeNestedType,
} from 'state/data-types/selectors';


export const mapStateToProps = state =>
  // console.log('TIPO ATTRIBUTO', getSelectedAttributeNestedType(state));
  // console.log(' selectedAttributeType', getSelectedAttributeType(state));
  ({
    attributeCode: getParams(state).attributeCode,
    dataTypeAttributeCode: getParams(state).entityCode,
    JoinAllowedOptions: formValueSelector('attribute')(state, 'joinRoles') || [],
    selectedAttributeType: getSelectedAttributeType(state),
    attributesList: getDataTypeAttributesIdList(state),
    initialValues: {
      type: getDataTypeSelectedAttributeCode(state),
      defaultValue: getSelectedAttributeNestedType(state),
    },
  });
export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ dataTypeAttributeCode, attributeCode }) => {
    dispatch(fetchAttributeFromDataType(dataTypeAttributeCode, attributeCode));
  },
  onSubmit: (values) => {
    const payload = {
      ...values,
      code: values.code,
      type: values.type,
      nestedAttribute: {
        code: values.code,
        type: values.listNestedType,
        enumeratorStaticItems: 'default',
        enumeratorStaticItemsSeparator: ',',
      },
    };
    console.log('PUT', payload);
    dispatch(sendPutAttributeFromDataType(payload));
  },
});

const EditFormContainer =
connect(mapStateToProps, mapDispatchToProps)(EditAttributeForm);
export default EditFormContainer;
