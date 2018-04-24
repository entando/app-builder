import { connect } from 'react-redux';
import { gotoRoute } from '@entando/router';
import { ROUTE_PAGE_ADD, ROUTE_PAGE_EDIT, ROUTE_PAGE_CONFIG } from 'app-init/router';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getLocale } from 'state/locale/selectors';
import PageTree from 'ui/pages/common/PageTree';
import { MODAL_ID } from 'ui/pages/common/DeletePageModal';
import { setVisibleModal, setInfo } from 'state/modal/actions';

import {
  setSelectedPage,
  handleExpandPage,
  setPageParent,
  movePageAbove,
  movePageBelow,
  publishSelectedPage,
  unpublishSelectedPage,
  clonePage,
  fetchSearchPages,
  clearSearchPage,
} from 'state/pages/actions';

import { getPageTreePages, getSearchPages } from 'state/pages/selectors';

export const mapStateToProps = state => ({
  locale: getLocale(state),
  pages: getPageTreePages(state),
  searchPages: getSearchPages(state),
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
});

export const mapDispatchToProps = dispatch => ({

  onWillMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(fetchSearchPages(page));
  },

  onClickAdd: () => { gotoRoute(ROUTE_PAGE_ADD); },
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
    dispatch(setSelectedPage(page));
    dispatch(clearSearchPage());
    dispatch(publishSelectedPage());
  },
  onClickUnPublish: (page) => {
    dispatch(setSelectedPage(page));
    dispatch(clearSearchPage());
    dispatch(unpublishSelectedPage());
  },
  onClickDetails: (page) => {
    dispatch(setSelectedPage(page));
    dispatch(clearSearchPage());
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
