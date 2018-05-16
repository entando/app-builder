import { connect } from 'react-redux';
import { fetchAttributeFromProfileType, sendPutAttributeFromProfileTypeMonolist } from 'state/profile-types/actions';
import MonolistAttributeForm from 'ui/common/form/MonolistAttributeForm';
import { getParams } from '@entando/router';
import { formValueSelector } from 'redux-form';

export const mapStateToProps = state => ({
  attributeCode: getParams(state).attributeCode,
  profileTypeCode: getParams(state).entityCode,
  isIndexable: formValueSelector('attribute')(state, 'nestedAttribute.indexable'),
  type: formValueSelector('attribute')(state, 'nestedAttribute.type'),
  selectedAttribute: formValueSelector('attribute')(state, 'type'),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ attributeCode, profileTypeCode }) => {
    dispatch(fetchAttributeFromProfileType(profileTypeCode, attributeCode));
  },
  onSubmit: (values) => {
    console.log('test', values);
    dispatch(sendPutAttributeFromProfileTypeMonolist(values));
  },
});

const AddFormContainer =
  connect(mapStateToProps, mapDispatchToProps)(MonolistAttributeForm);
export default AddFormContainer;
