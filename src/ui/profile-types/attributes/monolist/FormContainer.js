import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchAttributeFromProfileType, sendPutAttributeFromProfileTypeMonolist } from 'state/profile-types/actions';
import { getSelectedAttribute } from 'state/profile-types/selectors';
import MonolistAttributeForm from 'ui/common/form/MonolistAttributeForm';
import { formValueSelector } from 'redux-form';

export const mapStateToProps = (state, { match: { params } }) => ({
  attributeCode: params.attributeCode,
  profileTypeCode: params.entityCode,
  isIndexable: formValueSelector('attribute')(state, 'nestedAttribute.indexable'),
  type: formValueSelector('attribute')(state, 'nestedAttribute.type'),
  selectedAttribute: getSelectedAttribute(state),
  selectedAttributeType: formValueSelector('attribute')(state, 'type'),
});

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onDidMount: ({ attributeCode, profileTypeCode }) => {
    dispatch(fetchAttributeFromProfileType(profileTypeCode, attributeCode));
  },
  onSubmit: (values) => {
    dispatch(sendPutAttributeFromProfileTypeMonolist(values, params.entityCode));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(MonolistAttributeForm));
