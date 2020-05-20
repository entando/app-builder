
import { connect } from 'react-redux';

import { PageTreeSelector } from '@entando/pagetreeselector';

import { handleExpandPage, fetchPageTreeAll, collapseAll } from 'state/pages/actions';

import { getPageTreePages } from 'state/pages/selectors';
import { getLoading } from 'state/loading/selectors';

export const mapStateToProps = (state, { pages }) => ({
  pages: pages || getPageTreePages(state),
  loading: getLoading(state).pageTree,
});

export const mapDispatchToProps = dispatch => ({
  onExpandPage: pageCode =>
    dispatch(handleExpandPage(pageCode)),
  onExpandAll: () => dispatch(fetchPageTreeAll()),
  onCollapseAll: () => dispatch(collapseAll()),
});


const PageTreeSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(PageTreeSelector);


export default PageTreeSelectorContainer;
