import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchProfileTypeAttributes, sendPutProfileType, fetchProfileType,
  fetchProfileTypeAttribute,
  sendMoveAttributeUp,
  sendMoveAttributeDown,
} from 'state/profile-types/actions';
import {
  getSelectedProfileTypeAttributes,
  getProfileTypeAttributesIdList,

} from 'state/profile-types/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/profile-types/attributes/DeleteAttributeModal';
import ProfileTypeForm from 'ui/profile-types/common/ProfileTypeForm';
import { formValueSelector } from 'redux-form';
import {
  history,
  ROUTE_PROFILE_TYPE_ATTRIBUTE_ADD,
  ROUTE_PROFILE_TYPE_ATTRIBUTE_EDIT,
} from 'app-init/router';

import { routeConverter } from 'helpers/routeConverter';

export const mapStateToProps = (state, { match: { params } }) => (
  {
    mode: 'edit',
    profileTypeCode: params.profiletypeCode,
    attributes: getSelectedProfileTypeAttributes(state),
    attributesType: getProfileTypeAttributesIdList(state),
    attributeCode: formValueSelector('ProfileType')(state, 'type'),
    routeToEdit: ROUTE_PROFILE_TYPE_ATTRIBUTE_EDIT,
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ profileTypeCode }) => {
    dispatch(fetchProfileType(profileTypeCode));
    dispatch(fetchProfileTypeAttributes());
  },
  onAddAttribute: ({ attributeCode, profileTypeCode }) => {
    dispatch(fetchProfileTypeAttribute(attributeCode)).then(() => {
      history.push(routeConverter(
        ROUTE_PROFILE_TYPE_ATTRIBUTE_ADD,
        { entityCode: profileTypeCode },
      ));
    });
  },
  onMoveUp: (entityCode, attributeCode, attributeIndex) => {
    dispatch(sendMoveAttributeUp({ entityCode, attributeCode, attributeIndex }));
  },
  onMoveDown: (entityCode, attributeCode, attributeIndex) => {
    dispatch(sendMoveAttributeDown({ entityCode, attributeCode, attributeIndex }));
  },
  onClickDelete: (code) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'attribute', code }));
  },
  onSubmit: (values) => {
    dispatch(sendPutProfileType(values));
  },

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileTypeForm));
