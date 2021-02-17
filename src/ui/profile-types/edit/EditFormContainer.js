import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { routeConverter } from '@entando/utils';
import { formValueSelector, submit } from 'redux-form';

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
import {
  history,
  ROUTE_PROFILE_TYPE_ATTRIBUTE_ADD,
  ROUTE_PROFILE_TYPE_ATTRIBUTE_EDIT,
  ROUTE_PROFILE_TYPE_LIST,
} from 'app-init/router';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';

import ProfileTypeForm from 'ui/profile-types/common/ProfileTypeForm';

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
    dispatch(fetchProfileTypeAttribute(profileTypeCode, attributeCode)).then(() => {
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
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('ProfileType')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_PROFILE_TYPE_LIST)); },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(ProfileTypeForm));
