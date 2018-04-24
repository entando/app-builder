import { connect } from 'react-redux';
import { fetchDataTypeAttributes, sendPostAttributeFromDataType } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import { getParams } from '@entando/router';
import AttributeForm from 'ui/common/form/AttributeForm';
import {
  getDataTypeSelectedAttribute,
  getDataTypeSelectedAttributeCode,
  getDataTypeAttributesIdList,
} from 'state/data-types/selectors';


export const mapStateToProps = (state) => {
  console.log('test', state.dataTypes.selected.attributes);
  return {
    dataTypeAttributeCode: getParams(state).entityCode,
    JoinAllowedOptions: formValueSelector('attribute')(state, 'joinRoles') || [],
    selectedAttributeType: getDataTypeSelectedAttribute(state),
    attributesList: getDataTypeAttributesIdList(state),
    initialValues: {
      type: getDataTypeSelectedAttributeCode(state),
    },
  };
};

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  onSubmit: (values) => {
    const payload = {
      code: values.code,
      type: values.type,
      nestedAttribute: {
        code: values.code,
        type: values.listNestedType,
      },
    };
    dispatch(sendPostAttributeFromDataType(payload));
  },
});

const AddFormContainer =
connect(mapStateToProps, mapDispatchToProps)(AttributeForm);
export default AddFormContainer;
