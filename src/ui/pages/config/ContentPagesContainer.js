import { connect } from 'react-redux';
import { getPageTreePages } from 'state/pages/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/pages/common/DeletePageModal';
import { MODAL_ID as UNPUBLISH_MODAL_ID } from 'ui/pages/common/UnpublishPageModal';
import { MODAL_ID as PUBLISH_MODAL_ID } from 'ui/pages/common/PublishPageModal';
import {
  clonePage,
  clearSearchPage,
  handleExpandPage,
  initPageForm,
  fetchPageTreeAll,
  collapseAll,
  clearTree,
} from 'state/pages/actions';
import { PAGE_INIT_VALUES } from 'ui/pages/common/const';
import ContentPages from 'ui/pages/config/ContentPages';
import { getLoading } from 'state/loading/selectors';

export const mapStateToProps = state => ({
  pages: getPageTreePages(state),
  loading: getLoading(state).pageTree,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(clearTree());
    dispatch(handleExpandPage());
  },
  onExpandPage: pageCode =>
    dispatch(handleExpandPage(pageCode)),
  onClickAdd: (page) => {
    dispatch(initPageForm({
      parentCode: page.code,
      ...PAGE_INIT_VALUES,
    }));
  },
  onClickDelete: (page) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'page', code: page.code }));
  },
  onClickPublish: (page) => {
    dispatch(setVisibleModal(PUBLISH_MODAL_ID));
    dispatch(setInfo({ type: 'page', code: page.code }));
  },
  onClickUnPublish: (page) => {
    dispatch(setVisibleModal(UNPUBLISH_MODAL_ID));
    dispatch(setInfo({ type: 'page', code: page.code }));
  },
  onClickClone: (page) => {
    dispatch(clonePage(page));
    dispatch(clearSearchPage());
  },
  onExpandAll: () => dispatch(fetchPageTreeAll()),
  onCollapseAll: () => dispatch(collapseAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentPages);
