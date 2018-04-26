import { connect } from 'react-redux';
import { fetchAttributeFromDataType, sendPutAttributeFromDataType } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import { getParams } from '@entando/router';
import EditAttributeForm from 'ui/common/form/EditAttributeForm';
import {
  getSelectedAttributeType,
  getDataTypeAttributesIdList,
  getDataTypeSelectedAttributeCode,
} from 'state/data-types/selectors';

export const mapStateToProps = state => ({
  attributeCode: getParams(state).attributeCode,
  dataTypeAttributeCode: getParams(state).entityCode,
  JoinAllowedOptions: formValueSelector('attribute')(state, 'joinRoles') || [],
  selectedAttributeType: getSelectedAttributeType(state),
  attributesList: getDataTypeAttributesIdList(state),
  validation: state.dataTypes.selected.attributeSelected,
  initialValues: {
    type: getDataTypeSelectedAttributeCode(state),
  },
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
connect(mapStateToProps, mapDispatchToProps)(EditAttributeForm);
export default EditFormContainer;
