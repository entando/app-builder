import { connect } from 'react-redux';
import { gotoRoute } from '@entando/router';
import { ROUTE_PAGE_ADD, ROUTE_PAGE_EDIT, ROUTE_PAGE_CONFIG } from 'app-init/router';
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
} from 'state/pages/actions';


import { getPageTreePages } from 'state/pages/selectors';


export const mapStateToProps = state => ({
  pages: getPageTreePages(state),
});

export const mapDispatchToProps = dispatch => ({
  onClickAdd: () => { gotoRoute(ROUTE_PAGE_ADD); },
  onClickEdit: (page) => {
    dispatch(setSelectedPage(page));
    gotoRoute(ROUTE_PAGE_EDIT, { pageCode: page.code });
  },
  onClickConfigure: (page) => {
    dispatch(setSelectedPage(page));
    gotoRoute(ROUTE_PAGE_CONFIG, { pageCode: page.code });
  },
  onClickDelete: (page) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'page', code: page.code }));
  },
  onClickPublish: (page) => {
    dispatch(setSelectedPage(page));
    dispatch(publishSelectedPage());
  },
  onClickUnPublish: (page) => {
    dispatch(setSelectedPage(page));
    dispatch(unpublishSelectedPage());
  },
  onClickDetails: (page) => {
    dispatch(setSelectedPage(page));
  },
  onClickClone: (page) => {
    dispatch(setSelectedPage(page));
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
