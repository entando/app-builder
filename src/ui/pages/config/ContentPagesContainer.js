import { connect } from 'react-redux';
import { getPageTreePages } from 'state/pages/selectors';
import {
  history,
  ROUTE_PAGE_EDIT,
  ROUTE_PAGE_CONFIG,
  ROUTE_PAGE_DETAIL,
} from 'app-init/router';
import { routeConverter } from '@entando/utils';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/pages/common/DeletePageModal';
import { MODAL_ID as UNPUBLISH_MODAL_ID } from 'ui/pages/common/UnpublishPageModal';
import { MODAL_ID as PUBLISH_MODAL_ID } from 'ui/pages/common/PublishPageModal';
import {
  setSelectedPage,
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
import { getLocale } from 'state/locale/selectors';
import { getDomain } from '@entando/apimanager';
import { PREVIEW_NAMESPACE } from 'ui/pages/config/const';

export const mapStateToProps = state => ({
  pages: getPageTreePages(state),
  loading: getLoading(state).pageTree,
  domain: getDomain(state),
  locale: getLocale(state),

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
  onClickEdit: (page) => {
    dispatch(setSelectedPage(page));
    dispatch(clearSearchPage());
    history.push(routeConverter(ROUTE_PAGE_EDIT, { pageCode: page.code }));
  },
  onClickConfigure: (page) => {
    dispatch(setSelectedPage(page));
    dispatch(clearSearchPage());
    history.push(routeConverter(ROUTE_PAGE_CONFIG, { pageCode: page.code }));
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
  onClickDetails: (page) => {
    dispatch(setSelectedPage(page));
    dispatch(clearSearchPage());
    history.push(routeConverter(ROUTE_PAGE_DETAIL, { pageCode: page.code }));
  },
  onClickClone: (page) => {
    dispatch(clonePage(page));
    dispatch(clearSearchPage());
  },
  onClickPreview: (page, domain) => {
    window.open(`${domain}/${PREVIEW_NAMESPACE}?pageCode=${page.code}&token=${page.token}`, '_blank');
  },
  onClickViewPublishedPage: (page, domain, locale) => {
    window.open(`${domain}/${locale}/${page.code}.page`, '_blank');
  },
  onExpandAll: () => dispatch(fetchPageTreeAll()),
  onCollapseAll: () => dispatch(collapseAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentPages);
