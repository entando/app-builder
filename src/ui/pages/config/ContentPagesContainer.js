import { connect } from 'react-redux';
import { convertToQueryString, routeConverter } from '@entando/utils';
import { getPageTreePages, getSearchPages, getSelectedPage } from 'state/pages/selectors';
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
  fetchSearchPages,
  collapseAll,
  clearTree,
  clearSearch,
  setSelectedPage,
} from 'state/pages/actions';
import { PAGE_INIT_VALUES } from 'ui/pages/common/const';
import ContentPages from 'ui/pages/config/ContentPages';
import { getLoading } from 'state/loading/selectors';
import { getLocale } from 'state/locale/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getUserPreferences } from 'state/user-preferences/selectors';
import { history, ROUTE_PAGE_CONFIG } from 'app-init/router';
import { getDomain } from '@entando/apimanager';
import { PREVIEW_NAMESPACE } from 'ui/pages/config/const';
import { openInNewTab } from 'helpers/urlUtils';

export const mapStateToProps = state => ({
  loading: getLoading(state).pageTree,
  locale: getLocale(state),
  pages: getPageTreePages(state),
  searchPages: getSearchPages(state),
  selectedPage: getSelectedPage(state),
  loadOnPageSelect: getUserPreferences(state).loadOnPageSelect,
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
  domain: getDomain(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page) => {
    dispatch(clearTree());
    dispatch(setSelectedPage(page));
    dispatch(clearSearch());
    dispatch(handleExpandPage());
  },
  onExpandPage: pageCode =>
    dispatch(handleExpandPage(pageCode)),
  onClickAdd: (page) => {
    dispatch(initPageForm({
      parentCode: page.code,
      ...PAGE_INIT_VALUES,
    }, ROUTE_PAGE_CONFIG));
  },
  onClickDelete: (page) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'page', code: page.code, successRedirect: false }));
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
    dispatch(clonePage(page, ROUTE_PAGE_CONFIG));
    dispatch(clearSearchPage());
  },
  onClickPreview: (page, domain) => {
    openInNewTab(`${domain}/${PREVIEW_NAMESPACE}?pageCode=${page.code}&token=${page.token}`);
  },
  onClickViewPublishedPage: (page, domain, locale) => {
    openInNewTab(`${domain}/${locale}/${page.code}.page`);
  },
  onExpandAll: (currentPage) => {
    dispatch(fetchPageTreeAll());
    dispatch(setSelectedPage(currentPage));
  },
  onCollapseAll: () => dispatch(collapseAll()),
  onPageSearch: (value) => {
    if (value) {
      let queryString = convertToQueryString({
        sorting: {
          attribute: 'code',
        },
      });
      queryString = `${queryString}&pageCodeToken=${value}`;
      dispatch(fetchSearchPages({ page: 1, pageSize: 100 }, queryString));
    }
  },
  onClear: () => {
    dispatch(clearSearchPage());
  },
  onLoadPage: (page) => {
    dispatch(setSelectedPage(page));
    history.push(routeConverter(ROUTE_PAGE_CONFIG, { pageCode: page.code }));
  },
  onSearchPageChange: (page = { page: 1, pageSize: 10 }, pageCodeToken) => {
    const queryString = `?pageCodeToken=${pageCodeToken}`;
    dispatch(fetchSearchPages(page, queryString));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onWillMount: () => {
      dispatchProps.onWillMount(stateProps.selectedPage);
    },
  }),
)(ContentPages);
