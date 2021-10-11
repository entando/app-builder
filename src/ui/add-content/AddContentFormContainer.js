import { connect } from 'react-redux';
import { injectIntl, defineMessages } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { change, formValueSelector, submit, destroy } from 'redux-form';
import { routeConverter } from '@entando/utils';

import {
  clearEditContentForm,
  setOwnerGroupDisable,
  setWorkMode,
  saveContent,
  fetchContent,
  setMissingTranslations,
  setSaveType,
} from 'state/edit-content/actions';
import { setVisibleModal } from 'state/modal/actions';
import { fetchContentType } from 'state/content-type/actions';
import { sendPublishContent } from 'state/contents/actions';
import { fetchCategoryTree } from 'state/categories/actions';
import { ROUTE_CMS_CONTENTS, WIDGET_CONFIG_ROUTE } from 'app-init/router';
import { addToast, TOAST_SUCCESS } from '@entando/messages';

import EditContentForm from 'ui/edit-content/EditContentForm';
import { getUsername } from '@entando/apimanager';
import { getSelectedContentType } from 'state/content-type/selectors';
import { getTranslationWarning, getUserPreferences } from 'state/user-preferences/selectors';
import { getLocale } from 'state/locale/selectors';

import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';

import {
  getOwnerGroupDisabled,
  getSaveType,
  getContent,
  getMissingTranslations,
} from 'state/edit-content/selectors';
import { fetchAllGroupEntries } from 'state/groups/actions';
import { getGroupsList, getGroupEntries } from 'state/groups/selectors';
import { CONTINUE_SAVE_TYPE, WORK_MODE_ADD, WORK_MODE_EDIT, APPROVE_SAVE_TYPE } from 'state/edit-content/types';
import { fetchMyGroupPermissions } from 'state/permissions/actions';
import { getMyGroupPermissions } from 'state/permissions/selectors';
import { CRUD_CONTENTS_PERMISSION, SUPERUSER_PERMISSION } from 'state/permissions/const';

export const TranslationWarningModalID = 'TranslationWarningModal';

const publishContentMsgs = defineMessages({
  published: {
    id: 'cms.contents.published',
    defaultMessage: 'Published.',
  },
  unpublished: {
    id: 'cms.contents.unpublished',
    defaultMessage: 'Unpublished.',
  },
  saved: {
    id: 'cms.contents.saved',
    defaultMessage: 'Saved.',
  },
});

export const mapStateToProps = (state, ownProps) => {
  const { match: { params = {} } } = ownProps;
  const userPreferences = getUserPreferences(state);
  const groupWithContentPermission = getMyGroupPermissions(state)
    .find(({ permissions }) => (
      permissions.includes(SUPERUSER_PERMISSION) || permissions.includes(CRUD_CONTENTS_PERMISSION)
    ));
  const defaultOwnerGroup = userPreferences.defaultContentOwnerGroup
    || (groupWithContentPermission && groupWithContentPermission.group);
  const defaultJoinGroups = userPreferences.defaultContentJoinGroups;
  const { id: contentId, contentType } = params;

  return ({
    workMode: WORK_MODE_ADD,
    language: getLocale(state),
    groups: getGroupsList(state),
    allGroups: getGroupEntries(state),
    currentUser: getUsername(state),
    ownerGroupDisabled: getOwnerGroupDisabled(state),
    selectedJoinGroups: formValueSelector('editcontentform')(state, 'groups'),
    selectedCategories: formValueSelector('editcontentform')(state, 'contentCategories'),
    selectedOwnerGroup: formValueSelector('editcontentform')(state, 'mainGroup'),
    saveType: getSaveType(state),
    content: getContent(state),
    contentType: getSelectedContentType(state),
    status: formValueSelector('editcontentform')(state, 'status'),
    missingTranslations: getMissingTranslations(state),
    enableTranslationWarning: getTranslationWarning(state),
    ...(contentId == null && {
      initialValues: {
        mainGroup: defaultOwnerGroup,
        groups: defaultJoinGroups,
        contentType,
      },
    }),
  });
};

export const mapDispatchToProps = (dispatch, { intl, history, match: { params } }) => ({
  onDidMount: () => {
    dispatch(setWorkMode(WORK_MODE_ADD));
    dispatch(fetchCategoryTree());
    dispatch(fetchContentType(params.contentType))
      .catch(() => history.push(routeConverter(ROUTE_CMS_CONTENTS)));
    dispatch(fetchMyGroupPermissions({ sort: 'group' }));
    dispatch(fetchAllGroupEntries());
  },
  onSetOwnerGroupDisable: disabled => dispatch(setOwnerGroupDisable(disabled)),
  onWillUnmount: () => { dispatch(clearEditContentForm()); dispatch(destroy('ContentType')); },
  onIncompleteData: () => history.push(routeConverter(ROUTE_CMS_CONTENTS)),
  onSubmit: (values, categories, ignoreWarnings) => {
    const { saveType } = values;
    dispatch(saveContent(values, ignoreWarnings)).then((res) => {
      if (res) {
        dispatch(setVisibleModal(''));
        dispatch(addToast(
          intl.formatMessage(publishContentMsgs.saved),
          TOAST_SUCCESS,
        ));
        let callbackRoute = routeConverter(ROUTE_CMS_CONTENTS);
        const contentId = res.id ? res.id : res[0].id;

        const queryString = window.location.search;
        if (queryString.includes('callback')) {
          const urlParams = new URLSearchParams(window.location.search);
          const widgetConfigRoute = routeConverter(WIDGET_CONFIG_ROUTE, {
            widget: urlParams.get('callbackWidget'),
            page: urlParams.get('callbackPage'),
            frame: urlParams.get('callbackFrame'),
          });
          callbackRoute = `${widgetConfigRoute}?contentId=${contentId}`;
        }

        if (saveType === APPROVE_SAVE_TYPE) {
          dispatch(sendPublishContent(contentId, 'published'));
          history.push(callbackRoute);
        } else if (saveType !== CONTINUE_SAVE_TYPE) {
          history.push(callbackRoute);
        } else if (res && res[0]) {
          dispatch(setWorkMode(WORK_MODE_EDIT));
          dispatch(fetchContent(`/${res[0].id}`));
        } else if (res && res.id) {
          dispatch(setWorkMode(WORK_MODE_EDIT));
          dispatch(fetchContent(`/${res.id}`));
        }
      }
    }).catch((missingTranslation) => {
      dispatch(setVisibleModal(TranslationWarningModalID));
      dispatch(setMissingTranslations(missingTranslation));
      dispatch(setSaveType(saveType));
    });
  },
  onUnpublish: content => dispatch(sendPublishContent(content.id, 'draft')).then((res) => {
    if (res) {
      dispatch(addToast(
        intl.formatMessage(publishContentMsgs.unpublished),
        TOAST_SUCCESS,
      ));
    }
  }),
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('editcontentform')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_CMS_CONTENTS)); },
  changeStatus: value => dispatch(change('editcontentform', 'status', value)),
  closeModal: () => dispatch(setVisibleModal('')),
});

const EditContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(EditContentForm);

export default withRouter(injectIntl(EditContentContainer));
