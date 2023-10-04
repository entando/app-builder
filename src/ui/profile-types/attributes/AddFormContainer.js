import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { clearErrors } from '@entando/messages';
import { METHODS } from '@entando/apimanager';
import { routeConverter } from '@entando/utils';
import {
  setActionMode,
  fetchProfileTypeAttributes,
  fetchProfileTypeAttribute,
  handlerAttributeFromProfileType,
  removeAttributeFromComposite,
  moveAttributeFromComposite,
} from 'state/profile-types/actions';
import {
  getProfileTypeSelectedAttribute,
  getProfileTypeSelectedAttributeCode,
  getProfileTypeAttributesIdList,
  getProfileTypeSelectedAttributeIndexable,
  getProfileTypeSelectedAttributeSearchable,
  getProfileTypeSelectedAttributeAllowedRoles,
  getProfileTypeSelectedAttributeRoleChoices,
  getSelectedCompositeAttributes,
  getActionModeProfileTypeSelectedAttribute,
  getProfileTypeSelectedAttributeJoinRoles,
  getSelectedAttributeNestedType,
} from 'state/profile-types/selectors';
import { ROUTE_PROFILE_TYPE_ATTRIBUTE_ADD, ROUTE_PROFILE_TYPE_EDIT } from 'app-init/router';
import { TYPE_COMPOSITE, MODE_ADD } from 'state/profile-types/const';

import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';

import AttributeForm from 'ui/common/form/AttributeForm';

export const mapStateToProps = (state, { match: { params } }) => {
  const joinAllowedOptions = getProfileTypeSelectedAttributeJoinRoles(state) || [];
  return {
    mode: getActionModeProfileTypeSelectedAttribute(state) || 'add',
    profileTypeAttributeCode: params.entityCode,
    joinAllowedOptions,
    selectedAttributeType: getProfileTypeSelectedAttribute(state),
    attributesList: getProfileTypeAttributesIdList(state),
    allRoles: getProfileTypeSelectedAttributeAllowedRoles(state),
    allowedRoles: getProfileTypeSelectedAttributeRoleChoices(
      params.attributeCode,
      joinAllowedOptions,
    )(state),
    isSearchable: getProfileTypeSelectedAttributeSearchable(state),
    isIndexable: getProfileTypeSelectedAttributeIndexable(state),
    initialValues: {
      type: getProfileTypeSelectedAttributeCode(state),
      compositeAttributeType: TYPE_COMPOSITE,
    },
    compositeAttributes: getSelectedCompositeAttributes(state),
    nestedAttributeComposite: getSelectedAttributeNestedType(state) || '',
  };
};

export const mapDispatchToProps = (dispatch, { match: { params }, history }) => ({
  onDidMount: () => {
    dispatch(clearErrors());
    dispatch(fetchProfileTypeAttributes());
  },
  onSave: () => { dispatch(setVisibleModal('')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_PROFILE_TYPE_EDIT, { profiletypeCode: params.entityCode })); },
  onSubmit: (values, allowedRoles, mode) => {
    dispatch(handlerAttributeFromProfileType(
      METHODS.POST,
      values,
      allowedRoles,
      mode,
      params.entityCode,
      history,
    ));
  },

  onAddAttribute: (props) => {
    const {
      attributeCode,
      entityCode,
      selectedAttributeType: { code },
      values: { type },
    } = props;
    dispatch(setActionMode(MODE_ADD));
    dispatch(fetchProfileTypeAttribute(
      entityCode,
      attributeCode || type,
      () => history.push(routeConverter(ROUTE_PROFILE_TYPE_ATTRIBUTE_ADD, {
        entityCode: params.entityCode,
      })),
      code,
      'addAttribute',
    ));
  },
  onClickDelete: (attributeCode) => {
    dispatch(removeAttributeFromComposite(attributeCode));
  },
  onMove: (fromIndex, toIndex) => {
    dispatch(moveAttributeFromComposite(fromIndex, toIndex));
  },
});

const AddAttributeFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(AttributeForm);

export default injectIntl(withRouter(AddAttributeFormContainer));
