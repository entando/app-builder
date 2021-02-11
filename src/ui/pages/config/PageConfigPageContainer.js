import { connect } from 'react-redux';
import PageConfigPage from 'ui/pages/config/PageConfigPage';
import { clearErrors } from '@entando/messages';
import { initConfigPage, setSelectedPageOnTheFly, restoreSelectedPageConfig, applyDefaultConfig } from 'state/page-config/actions';
import { setSelectedPageTemplate } from 'state/page-templates/actions';
import { publishSelectedPage, unpublishSelectedPage } from 'state/pages/actions';
import { getSelectedPageTemplateCanBeOnTheFly } from 'state/page-templates/selectors';
import {
  makeGetPageIsOnTheFly,
  makeGetSelectedPageDiffersFromPublished,
  makeGetSelectedPageConfigMatchesDefault,
} from 'state/page-config/selectors';
import {
  getSelectedPage, getSelectedPageIsPublished, getSelectedPageLocaleTitle,
  getSelectedPagePreviewURI, getSelectedPublishedPageURI,
} from 'state/pages/selectors';
import { setVisibleModal } from 'state/modal/actions';
import { MODAL_ID } from 'ui/pages/config/SinglePageSettingsModal';
import { getLoading } from 'state/loading/selectors';
import withPermissions from 'ui/auth/withPermissions';
import { MANAGE_PAGES_PERMISSION } from 'state/permissions/const';
import { setAppTourProgress, setPublishStatus } from 'state/app-tour/actions';
import { getAppTourProgress } from 'state/app-tour/selectors';
import { reset, submit, isInvalid, isSubmitting } from 'redux-form';
import { FORM_ID } from 'ui/pages/edit/PagesEditFormContainer';
import { APP_TOUR_CANCELLED } from 'state/app-tour/const';

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onWillMount: (pageCode) => {
    dispatch(clearErrors());
    dispatch(initConfigPage(pageCode || params.pageCode));
  },
  onWillUnmount: () => dispatch(setSelectedPageTemplate(null)),
  setSelectedPageOnTheFly: value => dispatch(setSelectedPageOnTheFly(value, params.pageCode)),
  restoreConfig: () => dispatch(restoreSelectedPageConfig(params.pageCode)),
  publishPage: (appTourInProgress) => {
    dispatch(publishSelectedPage()).then(() => {
      if (appTourInProgress) {
        dispatch(setPublishStatus(true));
        dispatch(setAppTourProgress(APP_TOUR_CANCELLED));
        document.body.style.overflow = 'auto';
      }
    });
  },
  unpublishPage: () => dispatch(unpublishSelectedPage()),
  applyDefaultConfig: () => dispatch(applyDefaultConfig(params.pageCode)),
  showPageSettings: () => dispatch(setVisibleModal(MODAL_ID)),
  onSettingsCancel: () => {
    dispatch(reset(FORM_ID));
    dispatch(reset('SeoMetadataForm'));
  },
  onClickSaveSettings: async () => {
    await dispatch(submit(FORM_ID));
    dispatch(reset(FORM_ID));
    dispatch(reset('SeoMetadataForm'));
  },
});

export const mapStateToProps = (state, { match: { params } }) => {
  const selectedPage = getSelectedPage(state);
  if (!selectedPage) {
    return {};
  }
  return {
    pageCode: selectedPage.code,
    pageName: getSelectedPageLocaleTitle(state),
    pageStatus: selectedPage.status,
    previewUri: getSelectedPagePreviewURI(state),
    publishedPageUri: getSelectedPublishedPageURI(state),
    isOnTheFlyEnabled: getSelectedPageTemplateCanBeOnTheFly(state),
    pageIsOnTheFly: makeGetPageIsOnTheFly(params.pageCode)(state),
    pageIsPublished: getSelectedPageIsPublished(state),
    pageDiffersFromPublished: makeGetSelectedPageDiffersFromPublished(params.pageCode)(state),
    pageConfigMatchesDefault: makeGetSelectedPageConfigMatchesDefault(params.pageCode)(state),
    loading: getLoading(state).pageConfig,
    appTourProgress: getAppTourProgress(state),
    pageSettingsButtonSubmitting: isSubmitting(FORM_ID)(state),
    pageSettingsButtonInvalid: isInvalid(FORM_ID)(state),
  };
};

const PageConfigPageContainer = connect(
  mapStateToProps, mapDispatchToProps, null,
  {
    pure: false,
  },
)(PageConfigPage);
export default withPermissions(MANAGE_PAGES_PERMISSION)(PageConfigPageContainer);
