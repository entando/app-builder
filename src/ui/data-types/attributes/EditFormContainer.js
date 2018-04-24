import { connect } from 'react-redux';
import { fetchAttributeFromDataType, sendPutAttributeFromDataType } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import { getParams } from '@entando/router';
import AttributeForm from 'ui/common/form/AttributeForm';
import {
  getDataTypeSelectedAttribute,
  getDataTypeAttributesIdList,
} from 'state/data-types/selectors';

export const mapStateToProps = (state) => {
  console.log(state.dataTypes.selected.attributeSelected);
  return {
    attributeCode: getParams(state).attributeCode,
    dataTypeAttributeCode: getParams(state).entityCode,
    JoinAllowedOptions: formValueSelector('attribute')(state, 'joinRoles') || [],
    selectedAttributeType: getDataTypeSelectedAttribute(state),
    attributesList: getDataTypeAttributesIdList(state),
    validation: state.dataTypes.selected.attributeSelected,
  };
};

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
