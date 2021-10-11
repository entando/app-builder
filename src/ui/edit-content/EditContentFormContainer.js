import { connect } from 'react-redux';
import { injectIntl, defineMessages } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { change, formValueSelector, submit, destroy } from 'redux-form';
import { routeConverter } from '@entando/utils';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import {
  fetchContent,
  clearEditContentForm,
  setOwnerGroupDisable,
  saveContent,
  setWorkMode,
  setMissingTranslations,
  setSaveType,
} from 'state/edit-content/actions';
import { fetchCategoryTreeAll } from 'state/categories/actions';
import { sendPublishContent } from 'state/contents/actions';
import { setVisibleModal } from 'state/modal/actions';
import EditContentForm from 'ui/edit-content/EditContentForm';
import { getUsername } from '@entando/apimanager';
import { getLocale } from 'state/locale/selectors';
import {
  getOwnerGroupDisabled,
  getContent,
  getJoinedCategories,
  getSaveType,
  getMissingTranslations,
} from 'state/edit-content/selectors';
import { fetchAllGroupEntries } from 'state/groups/actions';
import { getGroupsList, getGroupEntries } from 'state/groups/selectors';
import { getLoading } from 'state/loading/selectors';
import { ROUTE_CMS_CONTENTS } from 'app-init/router';
import { CONTINUE_SAVE_TYPE, APPROVE_SAVE_TYPE, WORK_MODE_EDIT } from 'state/edit-content/types';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { getTranslationWarning } from 'state/user-preferences/selectors';

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

export const mapStateToProps = (state, { match: { params } }) => ({
  workMode: WORK_MODE_EDIT,
  language: getLocale(state),
  content: getContent(state),
  groups: getGroupsList(state),
  allGroups: getGroupEntries(state),
  currentUser: getUsername(state),
  contentId: params.id,
  ownerGroupDisabled: getOwnerGroupDisabled(state),
  selectedJoinGroups: formValueSelector('editcontentform')(state, 'groups'),
  selectedOwnerGroup: formValueSelector('editcontentform')(state, 'mainGroup'),
  status: formValueSelector('editcontentform')(state, 'status'),
  selectedCategories: getJoinedCategories(state),
  saveType: getSaveType(state),
  loading: getLoading(state).editContent,
  missingTranslations: getMissingTranslations(state),
  enableTranslationWarning: getTranslationWarning(state),
});

export const mapDispatchToProps = (dispatch, { history, intl }) => ({
  onDidMount: (fetchContentParams) => {
    dispatch(setWorkMode(WORK_MODE_EDIT));
    dispatch(fetchContent(fetchContentParams))
      .catch(() => history.push(routeConverter(ROUTE_CMS_CONTENTS)));
    dispatch(fetchAllGroupEntries());
    dispatch(fetchCategoryTreeAll());
  },
  onWillUnmount: () => { dispatch(clearEditContentForm()); dispatch(destroy('ContentType')); },
  onSetOwnerGroupDisable: disabled => dispatch(setOwnerGroupDisable(disabled)),
  onIncompleteData: () => history.push(routeConverter(ROUTE_CMS_CONTENTS)),
  onSubmit: (values, categories, ignoreWarnings, oldAttributes) => {
    const { saveType, id } = values;
    return dispatch(saveContent(values, ignoreWarnings, oldAttributes)).then((res) => {
      if (res) {
        dispatch(setVisibleModal(''));
        dispatch(addToast(
          intl.formatMessage(publishContentMsgs.saved),
          TOAST_SUCCESS,
        ));
        if (saveType === APPROVE_SAVE_TYPE) {
          dispatch(sendPublishContent(id, 'published'));
          history.push(routeConverter(ROUTE_CMS_CONTENTS));
        } else if (saveType !== CONTINUE_SAVE_TYPE) {
          history.push(routeConverter(ROUTE_CMS_CONTENTS));
        } else {
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
      history.push(routeConverter(ROUTE_CMS_CONTENTS));
    }
  }),
  onSave: () => {
    dispatch(setVisibleModal(''));
    dispatch(submit('editcontentform'));
  },
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
