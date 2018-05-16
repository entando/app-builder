import { connect } from 'react-redux';
import { fetchAttributeFromProfileType } from 'state/profile-types/actions';
import MonolistPage from 'ui/profile-types/attributes/monolist/MonolistPage';
import { getParams } from '@entando/router';
import { formValueSelector } from 'redux-form';


export const mapStateToProps = state => ({
  attributeCode: getParams(state).attributeCode,
  entityCode: getParams(state).entityCode,
  profileTypeCode: getParams(state).entityCode,
  isIndexable: formValueSelector('attribute')(state, 'nestedAttribute.indexable'),
  type: formValueSelector('attribute')(state, 'nestedAttribute.type'),
  selectedAttribute: formValueSelector('attribute')(state, 'type'),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ attributeCode, profileTypeCode }) => {
    dispatch(fetchAttributeFromProfileType(profileTypeCode, attributeCode));
  },
});

const MonolistPageContainer =
  connect(mapStateToProps, mapDispatchToProps)(MonolistPage);
export default MonolistPageContainer;
