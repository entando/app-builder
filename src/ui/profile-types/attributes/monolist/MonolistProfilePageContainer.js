import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchAttributeFromProfileType } from 'state/profile-types/actions';
import MonolistPage from 'ui/profile-types/attributes/monolist/MonolistPage';
import { formValueSelector } from 'redux-form';


export const mapStateToProps = (state, { match: { params } }) => ({
  attributeCode: params.attributeCode,
  entityCode: params.entityCode,
  profileTypeCode: params.entityCode,
  isIndexable: formValueSelector('attribute')(state, 'nestedAttribute.indexable'),
  type: formValueSelector('attribute')(state, 'nestedAttribute.type'),
  selectedAttribute: formValueSelector('attribute')(state, 'type'),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ attributeCode, profileTypeCode }) => {
    dispatch(fetchAttributeFromProfileType(profileTypeCode, attributeCode));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MonolistPage));
