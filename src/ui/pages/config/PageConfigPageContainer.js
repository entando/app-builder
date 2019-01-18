import { connect } from 'react-redux';
import PageConfigPage from 'ui/pages/config/PageConfigPage';
import { clearErrors } from '@entando/messages';
import { initConfigPage, setSelectedPageOnTheFly, restoreSelectedPageConfig, applyDefaultConfig } from 'state/page-config/actions';
import { setSelectedPageModel } from 'state/page-models/actions';
import { publishSelectedPage, unpublishSelectedPage } from 'state/pages/actions';
import { getSelectedPageModelCanBeOnTheFly } from 'state/page-models/selectors';
import { getPageIsOnTheFly, getSelectedPageDiffersFromPublished, getSelectedPageConfigMatchesDefault } from 'state/page-config/selectors';
import { getSelectedPage, getSelectedPageIsPublished, getSelectedPagePreviewURI } from 'state/pages/selectors';
import { getLocale } from 'state/locale/selectors';
import { setVisibleModal } from 'state/modal/actions';
import { MODAL_ID } from './SinglePageSettingsModal';

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(clearErrors());
    dispatch(initConfigPage());
  },
  onWillUnmount: () => dispatch(setSelectedPageModel(null)),
  setSelectedPageOnTheFly: value => dispatch(setSelectedPageOnTheFly(value)),
  restoreConfig: () => dispatch(restoreSelectedPageConfig()),
  publishPage: () => dispatch(publishSelectedPage()),
  unpublishPage: () => dispatch(unpublishSelectedPage()),
  applyDefaultConfig: () => dispatch(applyDefaultConfig()),
  showPageSettings: () => dispatch(setVisibleModal(MODAL_ID)),
});

export const mapStateToProps = (state) => {
  const selectedPage = getSelectedPage(state);
  if (!selectedPage) {
    return {};
  }
  return {
    pageCode: selectedPage.code,
    pageName: selectedPage.titles[getLocale(state)],
    pageStatus: selectedPage.status,
    previewUri: getSelectedPagePreviewURI(state),
    isOnTheFlyEnabled: getSelectedPageModelCanBeOnTheFly(state),
    pageIsOnTheFly: getPageIsOnTheFly(state),
    pageIsPublished: getSelectedPageIsPublished(state),
    pageDiffersFromPublished: getSelectedPageDiffersFromPublished(state),
    pageConfigMatchesDefault: getSelectedPageConfigMatchesDefault(state),
  };
};


const PageConfigPageContainer = connect(mapStateToProps, mapDispatchToProps)(PageConfigPage);
export default PageConfigPageContainer;
