import { connect } from 'react-redux';
import { formValueSelector, submit } from 'redux-form';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { METHODS } from '@entando/apimanager';
import { clearErrors } from '@entando/messages';
import { routeConverter } from '@entando/utils';
import AddContentTypeAttributeForm from 'ui/common/form/AddContentTypeAttributeForm';
import {
  setActionMode,
  fetchContentTypeAttributeRefs,
  handlerAttributeFromContentType,
  fetchContentTypeAttributeRef,
  removeAttributeFromComposite,
  moveAttributeFromComposite,
} from 'state/content-type/actions';
import { fetchLanguages } from 'state/languages/actions';

import {
  getContentTypeSelectedAttribute,
  getContentTypeSelectedAttributeCode,
  getContentTypeAttributesIdList,
  getContentTypeSelectedAttributeAllowedRoles,
  getContentTypeSelectedAttributeRoleChoices,
  getActionModeContentTypeSelectedAttribute,
  getSelectedCompositeAttributes,
} from 'state/content-type/selectors';

import { getActiveLanguages } from 'state/languages/selectors';

import { ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_ADD, ROUTE_CMS_CONTENTTYPE_EDIT } from 'app-init/router';
import { TYPE_COMPOSITE, MODE_ADD } from 'state/content-type/const';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';

export const mapStateToProps = (state, { match: { params } }) => {
  const joinAllowedOptions = formValueSelector('addAttribute')(state, 'joinRoles') || [];
  return {
    mode: getActionModeContentTypeSelectedAttribute(state) || 'add',
    contentTypeAttributeCode: params.entityCode,
    joinAllowedOptions,
    selectedAttributeType: getContentTypeSelectedAttribute(state),
    attributesList: getContentTypeAttributesIdList(state),
    initialValues: {
      type: getContentTypeSelectedAttributeCode(state),
      compositeAttributeType: TYPE_COMPOSITE,
    },
    allRoles: getContentTypeSelectedAttributeAllowedRoles(state),
    allowedRoles: getContentTypeSelectedAttributeRoleChoices(
      params.entityCode,
      joinAllowedOptions,
    )(state),
    compositeAttributes: getSelectedCompositeAttributes(state),
    languages: getActiveLanguages(state),
  };
};

const nopage = { page: 1, pageSize: 0 };

export const mapDispatchToProps = (dispatch, { match: { params }, history }) => ({
  onDidMount: () => {
    dispatch(clearErrors());
    dispatch(fetchLanguages(nopage));
    dispatch(fetchContentTypeAttributeRefs());
  },
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('addAttribute')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_CMS_CONTENTTYPE_EDIT, { code: params.entityCode })); },
  onSubmit: (values, allowedRoles, mode) => {
    dispatch(handlerAttributeFromContentType(
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
    } = props;
    dispatch(setActionMode(MODE_ADD));
    dispatch(fetchContentTypeAttributeRef(
      entityCode,
      attributeCode,
      () => history.push(routeConverter(ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_ADD, { entityCode })),
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

export default injectIntl(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false },
)(AddContentTypeAttributeForm)));
