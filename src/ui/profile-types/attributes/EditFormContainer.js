import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { METHODS } from '@entando/apimanager';
import { formValueSelector, submit } from 'redux-form';
import { clearErrors } from '@entando/messages';
import { routeConverter } from '@entando/utils';

import {
  setActionMode,
  fetchAttributeFromProfileType,
  fetchProfileTypeAttributes,
  fetchProfileTypeAttribute,
  handlerAttributeFromProfileType,
  removeAttributeFromComposite,
  moveAttributeFromComposite,
} from 'state/profile-types/actions';
import EditAttributeForm from 'ui/common/form/EditAttributeForm';
import {
  getProfileTypeSelectedAttribute,
  getAttributeTypeSelectFromProfileType,
  getActionModeProfileTypeSelectedAttribute,
  getProfileTypeAttributesIdList,
  getProfileTypeSelectedAttributeIndexable,
  getProfileTypeSelectedAttributeSearchable,
  getProfileTypeSelectedAttributeAllowedRoles,
  getProfileTypeSelectedAttributeRoleChoices,
  getSelectedCompositeAttributes,
  getIsMonolistCompositeAttributeType,
} from 'state/profile-types/selectors';
import { MODE_EDIT_COMPOSITE, MODE_ADD_ATTRIBUTE_COMPOSITE } from 'state/profile-types/const';
import {
  ROUTE_PROFILE_TYPE_ATTRIBUTE_ADD,
  ROUTE_PROFILE_TYPE_EDIT,
  ROUTE_PROFILE_TYPE_ATTRIBUTE_EDIT,
} from 'app-init/router';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';

export const mapStateToProps = (state, { match: { params } }) => {
  const joinAllowedOptions = formValueSelector('attribute')(state, 'joinRoles') || [];
  return {
    mode: getActionModeProfileTypeSelectedAttribute(state) || 'edit',
    attributeCode: params.attributeCode,
    profileTypeAttributeCode: params.entityCode,
    joinAllowedOptions,
    selectedAttributeType: getAttributeTypeSelectFromProfileType(state),
    selectedAttributeTypeForAddComposite: getProfileTypeSelectedAttribute(state),
    attributesList: getProfileTypeAttributesIdList(state),
    allRoles: getProfileTypeSelectedAttributeAllowedRoles(state),
    allowedRoles: getProfileTypeSelectedAttributeRoleChoices(
      params.attributeCode,
      joinAllowedOptions,
    )(state),
    isSearchable: getProfileTypeSelectedAttributeSearchable(state),
    isIndexable: getProfileTypeSelectedAttributeIndexable(state),
    compositeAttributes: getSelectedCompositeAttributes(state),
    isMonolistCompositeType: getIsMonolistCompositeAttributeType(state),
    nestedAttributeComposite: formValueSelector('attribute')(state, 'nestedAttribute.type') || '',
  };
};

export const mapDispatchToProps = (dispatch, { match: { params }, history }) => ({
  onDidMount: ({ profileTypeAttributeCode, attributeCode }) => {
    dispatch(clearErrors());
    dispatch(fetchProfileTypeAttributes());
    dispatch(fetchAttributeFromProfileType('attribute', profileTypeAttributeCode, attributeCode));
  },
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('attribute')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: (mode) => {
    dispatch(setVisibleModal(''));
    if (mode === MODE_ADD_ATTRIBUTE_COMPOSITE) {
      dispatch(setActionMode(MODE_EDIT_COMPOSITE));
      history.push(routeConverter(ROUTE_PROFILE_TYPE_ATTRIBUTE_EDIT, {
        entityCode: params.entityCode,
        attributeCode: params.attributeCode,
      }));
    } else {
      history.push(routeConverter(ROUTE_PROFILE_TYPE_EDIT, { profiletypeCode: params.entityCode }));
    }
  },
  onSubmit: (values, allowedRoles, mode) => {
    dispatch(handlerAttributeFromProfileType(
      METHODS.PUT,
      values,
      allowedRoles,
      mode,
      params.entityCode,
      history,
    ));
  },
  onAddAttribute: (props) => {
    const { attributeCode, profileTypeAttributeCode, selectedAttributeType } = props;
    dispatch(fetchProfileTypeAttribute(
      profileTypeAttributeCode,
      attributeCode,
      () => history.push(routeConverter(ROUTE_PROFILE_TYPE_ATTRIBUTE_ADD, {
        entityCode: profileTypeAttributeCode,
      })),
      selectedAttributeType,
      'attribute',
    ));
  },
  onClickDelete: (attributeCode, isMonolistCompositeType) => {
    dispatch(removeAttributeFromComposite(attributeCode, isMonolistCompositeType));
  },
  onMove: (fromIndex, toIndex, isMonolistCompositeType) => {
    dispatch(moveAttributeFromComposite(fromIndex, toIndex, isMonolistCompositeType));
  },
});

const EditAttributeFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(EditAttributeForm);

export default injectIntl(withRouter(EditAttributeFormContainer));
