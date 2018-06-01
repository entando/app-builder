import { connect } from 'react-redux';
import { gotoRoute } from '@entando/router';
import { ROUTE_PAGE_EDIT, ROUTE_PAGE_CONFIG, ROUTE_PAGE_DETAIL } from 'app-init/router';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getLocale } from 'state/locale/selectors';
import PageTree from 'ui/pages/common/PageTree';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/pages/common/DeletePageModal';
import { MODAL_ID as PUBLISH_MODAL_ID } from 'ui/pages/common/PublishPageModal';
import { MODAL_ID as UNPUBLISH_MODAL_ID } from 'ui/pages/common/UnpublishPageModal';

import {
  setSelectedPage,
  handleExpandPage,
  setPageParent,
  movePageAbove,
  movePageBelow,
  clonePage,
  clearSearchPage,
  initPageForm,
} from 'state/pages/actions';

import { getPageTreePages, getSearchPages } from 'state/pages/selectors';
import { PAGE_INIT_VALUES } from 'ui/pages/common/const';

export const mapStateToProps = state => ({
  locale: getLocale(state),
  pages: getPageTreePages(state),
  searchPages: getSearchPages(state),
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
});

export const mapDispatchToProps = dispatch => ({
  onClickAdd: (page) => {
    dispatch(initPageForm({
      parentCode: page.code,
      ...PAGE_INIT_VALUES,
    }));
  },
  onClickEdit: (page) => {
    dispatch(setSelectedPage(page));
    dispatch(clearSearchPage());
    gotoRoute(ROUTE_PAGE_EDIT, { pageCode: page.code });
  },
  onClickConfigure: (page) => {
    dispatch(setSelectedPage(page));
    dispatch(clearSearchPage());
    gotoRoute(ROUTE_PAGE_CONFIG, { pageCode: page.code });
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
    gotoRoute(ROUTE_PAGE_DETAIL, { pageCode: page.code });
  },
  onClickClone: (page) => {
    dispatch(clonePage(page));
    dispatch(clearSearchPage());
  },

  onDropIntoPage: (sourcePageCode, targetPageCode) =>
    dispatch(setPageParent(sourcePageCode, targetPageCode)),
  onDropAbovePage: (sourcePageCode, targetPageCode) =>
    dispatch(movePageAbove(sourcePageCode, targetPageCode)),
  onDropBelowPage: (sourcePageCode, targetPageCode) =>
    dispatch(movePageBelow(sourcePageCode, targetPageCode)),
  onExpandPage: pageCode =>
    dispatch(handleExpandPage(pageCode)),
});


const PageTreeContainer = connect(mapStateToProps, mapDispatchToProps)(PageTree);


export default PageTreeContainer;
