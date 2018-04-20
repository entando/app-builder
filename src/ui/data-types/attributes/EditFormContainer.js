import { connect } from 'react-redux';
import { fetchAttributeFromDataType, sendPutAttributeFromDataType } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import { getParams } from '@entando/router';
import AttributeForm from 'ui/common/form/AttributeForm';
import { getDataTypeSelectedAttribute } from 'state/data-types/selectors';

export const mapStateToProps = state => ({
  attributeCode: getParams(state).attributeCode,
  dataTypeAttributeCode: getParams(state).entityCode,
  JoinAllowedOptions: formValueSelector('attribute')(state, 'joinRoles') || [],
  selectedAttributeType: getDataTypeSelectedAttribute(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ dataTypeAttributeCode, attributeCode }) => {
    dispatch(fetchAttributeFromDataType(dataTypeAttributeCode, attributeCode));
  },
  onSubmit: (values) => {
    dispatch(sendPutAttributeFromDataType(values));
  },
});

const EditFormContainer =
connect(mapStateToProps, mapDispatchToProps)(AttributeForm);
export default EditFormContainer;
