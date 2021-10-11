import { connect } from 'react-redux';

import { PageTreeSelector } from '@entando/pagetreeselector';
import { handleExpandPage, fetchPageTreeAll, collapseAll, clearTree } from 'state/pages/actions';
import { HOMEPAGE_CODE } from 'state/pages/const';
import { getPageTreePages } from 'state/pages/selectors';
import { getLoading } from 'state/loading/selectors';


export const mapStateToProps = (state, { input }) => ({
  pages: getPageTreePages(state),
  loading: getLoading(state).pageTree,
  input,
});

export const mapDispatchToProps = (dispatch, { status, ownerGroup, joinGroups }) => ({
  onDidMount: () => {
    dispatch(clearTree());
    dispatch(handleExpandPage(HOMEPAGE_CODE, status, ownerGroup, joinGroups));
  },
  onExpandPage: pageCode => dispatch(handleExpandPage(pageCode, status, ownerGroup, joinGroups)),
  onExpandAll: () => dispatch(fetchPageTreeAll()),
  onCollapseAll: () => dispatch(collapseAll()),
});


const PageTreeSelectContainer = connect(mapStateToProps, mapDispatchToProps)(PageTreeSelector);


export default PageTreeSelectContainer;
