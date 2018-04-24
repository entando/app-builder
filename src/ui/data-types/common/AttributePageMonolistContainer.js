import { connect } from 'react-redux';
import { fetchAttributeFromDataType, sendPutAttributeFromDataType } from 'state/data-types/actions';
import AttributeForm from 'ui/common/form/AttributeForm';
import { getParams } from '@entando/router';
// import { formValueSelector } from 'redux-form';
// import {
//   getDataTypeSelectedAttributeCode,
//   getDataTypeAttributesIdList,
//   getSelectedDataTypeAttributes,
//   getDataTypeSelectedAttributeIsList,
// } from 'state/data-types/selectors';

export const mapStateToProps = state => ({
  attributeCode: getParams(state).attributeCode,
  dataTypeCode: getParams(state).entityCode,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ attributeCode, dataTypeCode }) => {
    dispatch(fetchAttributeFromDataType(attributeCode, dataTypeCode));
  },
  handleSubmit: values => (sendPutAttributeFromDataType(values)),
});

const AttributePageMonolistContainer =
  connect(mapStateToProps)(AttributeForm);
export default AttributePageMonolistContainer;
