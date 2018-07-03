import { connect } from 'react-redux';
import { fetchAttributeFromDataType, sendPutAttributeFromDataTypeMonolist } from 'state/data-types/actions';
import MonolistAttributeForm from 'ui/common/form/MonolistAttributeForm';
import { getParams } from '@entando/router';
import { formValueSelector } from 'redux-form';

export const mapStateToProps = state => ({
  attributeCode: getParams(state).attributeCode,
  dataTypeCode: getParams(state).entityCode,
  isIndexable: formValueSelector('monoListAttribute')(state, 'nestedAttribute.indexable'),
  type: formValueSelector('monoListAttribute')(state, 'nestedAttribute.type'),
  selectedAttribute: formValueSelector('monoListAttribute')(state, 'type'),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ attributeCode, dataTypeCode }) => {
    dispatch(fetchAttributeFromDataType('monoListAttribute', dataTypeCode, attributeCode));
  },
  onSubmit: (values) => {
    dispatch(sendPutAttributeFromDataTypeMonolist(values));
  },
});

const AddFormContainer =
  connect(mapStateToProps, mapDispatchToProps)(MonolistAttributeForm);
export default AddFormContainer;
