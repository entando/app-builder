import { connect } from 'react-redux';
import { fetchDataTypeAttribute, sendPutAttributeFromDataType } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import { getParams } from '@entando/router';
import AttributeForm from 'ui/common/form/AttributeForm';
import {
  getDataTypeSelectedAttribute,
  getDataTypeSelectedAttributeCode,
} from 'state/data-types/selectors';

export const mapStateToProps = state => ({
  dataTypeAttributeCode: getParams(state).entityCode,
  JoinAllowedOptions: formValueSelector('attribute')(state, 'joinRoles') || [],
  selectedAttributeType: getDataTypeSelectedAttribute(state),
  initialValues: {
    type: getDataTypeSelectedAttributeCode(state),
  },
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ attributeCode }) => {
    dispatch(fetchDataTypeAttribute(attributeCode));
  },
  onSubmit: (values) => {
    dispatch(sendPutAttributeFromDataType(values));
  },
});

const EditFormContainer =
connect(mapStateToProps, mapDispatchToProps)(AttributeForm);
export default EditFormContainer;
