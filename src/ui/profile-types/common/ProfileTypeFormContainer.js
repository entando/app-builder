import { connect } from 'react-redux';
import { fetchProfileTypeAttributes, sendPostProfileType } from 'state/profile-types/actions';
import { getProfileTypeAttributesIdList } from 'state/profile-types/selectors';
import ProfileTypeForm from 'ui/profile-types/common/ProfileTypeForm';
import { ROUTE_PROFILE_TYPE_EDIT } from 'app-init/router';
import { gotoRoute } from 'frontend-common-components';
import { formValueSelector } from 'redux-form';

export const mapStateToProps = (state) => {
  console.log('lista attributi', getProfileTypeAttributesIdList(state));
  return {
    mode: 'add',
    attributes: getProfileTypeAttributesIdList(state),
    attributeCode: formValueSelector('ProfileType')(state, 'type'),
  };
};

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchProfileTypeAttributes());
  },
  onSubmit: (values) => {
    dispatch(sendPostProfileType(values));
    console.log('secondo post', values);
    gotoRoute(ROUTE_PROFILE_TYPE_EDIT, { profiletypeCode: values.code });
  },

});
const ProfileTypeFormContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileTypeForm);
export default ProfileTypeFormContainer;
