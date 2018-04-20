import { connect } from 'react-redux';
import { gotoRoute } from '@entando/router';
import { ROUTE_PAGE_ADD } from 'app-init/router';
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
