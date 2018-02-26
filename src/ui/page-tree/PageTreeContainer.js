
import { connect } from 'react-redux';

import PageTree from 'ui/page-tree/PageTree';

import {
  handleExpandPage,
  setPageParent,
  movePageAbove,
  movePageBelow,
} from 'state/pages/actions';

import { getPageTreePages } from 'state/pages/selectors';


export const mapStateToProps = state => ({
  pages: getPageTreePages(state),
});

export const mapDispatchToProps = dispatch => ({
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
