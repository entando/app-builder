import { connect } from 'react-redux';
import {
  fetchProfileTypeAttributes, sendPutProfileType, fetchProfileType,
  fetchProfileTypeAttribute,

} from 'state/profile-types/actions';
import {
  getSelectedProfileTypeAttributes,
  getProfileTypeAttributesIdList,

} from 'state/profile-types/selectors';

import ProfileTypeForm from 'ui/profile-types/common/ProfileTypeForm';
import { formValueSelector } from 'redux-form';
import {
  getParams,
  gotoRoute,
} from '@entando/router';
import {
  ROUTE_PROFILE_TYPE_ATTRIBUTE_ADD,
  ROUTE_PROFILE_TYPE_ATTRIBUTE_EDIT,

} from 'app-init/router';

export const mapStateToProps = state => (
  {
    mode: 'edit',
    profiletypeCode: getParams(state).profiletypeCode,
    attributes: getSelectedProfileTypeAttributes(state),
    attributesType: getProfileTypeAttributesIdList(state),
    attributeCode: formValueSelector('ProfileType')(state, 'type'),
    routeToEdit: ROUTE_PROFILE_TYPE_ATTRIBUTE_EDIT,
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ profiletypeCode }) => {
    dispatch(fetchProfileType(profiletypeCode));
    dispatch(fetchProfileTypeAttributes());
  },
  onAddAttribute: ({ attributeCode, profiletypeCode }) => {
    dispatch(fetchProfileTypeAttribute(attributeCode)).then(() => {
      gotoRoute(ROUTE_PROFILE_TYPE_ATTRIBUTE_ADD, { entityCode: profiletypeCode });
    });
  },
  onSubmit: (values) => {
    dispatch(sendPutProfileType(values));
  },

});
const ProfileTypeFormContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileTypeForm);
export default ProfileTypeFormContainer;
