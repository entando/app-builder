import { connect } from 'react-redux';
import { fetchDataTypeAttributes, sendPostAttributeFromDataType } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import { getParams } from '@entando/router';
import AttributeForm from 'ui/common/form/AttributeForm';
import {
  getDataTypeSelectedAttribute,
  getDataTypeSelectedAttributeCode,
} from 'state/data-types/selectors';


export const mapStateToProps = state =>
  ({
    dataTypeAttributeCode: getParams(state).entityCode,
    JoinAllowedOptions: formValueSelector('attribute')(state, 'joinRoles') || [],
    selectedAttributeType: getDataTypeSelectedAttribute(state),
    initialValues: {
      type: getDataTypeSelectedAttributeCode(state),
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

const AddFormContainer =
connect(mapStateToProps, mapDispatchToProps)(AttributeForm);
export default AddFormContainer;
