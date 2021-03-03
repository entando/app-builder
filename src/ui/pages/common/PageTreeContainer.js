import { connect } from 'react-redux';
import {
  history,
  ROUTE_PAGE_EDIT,
  ROUTE_PAGE_CONFIG,
  ROUTE_PAGE_DETAIL,
} from 'app-init/router';
import { routeConverter } from '@entando/utils';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getLocale } from 'state/locale/selectors';
import PageTree from 'ui/pages/common/PageTree';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/pages/common/DeletePageModal';
import { MODAL_ID as MOVE_MODAL_ID } from 'ui/pages/common/MovePageModal';
import { MODAL_ID as PUBLISH_MODAL_ID } from 'ui/pages/common/PublishPageModal';
import { MODAL_ID as UNPUBLISH_MODAL_ID } from 'ui/pages/common/UnpublishPageModal';

import {
  setSelectedPage,
  handleExpandPage,
  clonePage,
  clearSearchPage,
  initPageForm,
  fetchPageTreeAll,
  collapseAll,
  fetchSearchPages,
} from 'state/pages/actions';

import { setColumnOrder } from 'state/table-column-order/actions';
import { getColumnOrder } from 'state/table-column-order/selectors';

import { getPageTreePages, getSearchPages } from 'state/pages/selectors';
import { PAGE_INIT_VALUES } from 'ui/pages/common/const';
import { setAppTourLastStep } from 'state/app-tour/actions';
import { getDomain } from '@entando/apimanager';
import { PREVIEW_NAMESPACE } from 'ui/pages/config/const';

export const mapStateToProps = state => ({
  locale: getLocale(state),
  pages: getPageTreePages(state),
  searchPages: getSearchPages(state),
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
  domain: getDomain(state),
  columnOrder: getColumnOrder(state, 'pageList'),
  pageSearchColumnOrder: getColumnOrder(state, 'pageSearch'),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onSetColumnOrder: columnOrder => dispatch(setColumnOrder(columnOrder, 'pageList')),
  onSetColumnOrderPageSearch: columnOrder => dispatch(setColumnOrder(columnOrder, 'pageSearch')),
  onNextStep: nextStep => dispatch(setAppTourLastStep(nextStep)),
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
  onClickViewPublishedPage: (page, domain, locale) => {
    window.open(`${domain}/${locale}/${page.code}.page`, '_blank');
  },
  onClickPreview: (page, domain) => {
    window.open(`${domain}/${PREVIEW_NAMESPACE}?pageCode=${page.code}&token=${page.token}`, '_blank');
  },
  onDropPage: (sourcePageCode, targetPageCode, action) => {
    dispatch(setVisibleModal(MOVE_MODAL_ID));
    dispatch(setInfo({
      type: 'page', sourcePageCode, targetPageCode, action,
    }));
  },
  onExpandPage: pageCode =>
    dispatch(handleExpandPage(pageCode)),
  onExpandAll: () => dispatch(fetchPageTreeAll()),
  onCollapseAll: () => dispatch(collapseAll()),
  onSearchPageChange: (page = { page: 1, pageSize: 10 }) => {
    const { searchPageCodeToken } = ownProps;
    const queryString = `?pageCodeToken=${searchPageCodeToken}`;
    dispatch(fetchSearchPages(page, queryString));
  },
});


const PageTreeContainer = connect(mapStateToProps, mapDispatchToProps)(PageTree);


export default PageTreeContainer;
