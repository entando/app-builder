
import { connect } from 'react-redux';

import { PageTreeSelector } from '@entando/pagetreeselector';

import { handleExpandPage } from 'state/pages/actions';

import { getPageTreePages } from 'state/pages/selectors';

export const mapStateToProps = state => ({
  pages: getPageTreePages(state),
});

export const mapDispatchToProps = dispatch => ({
  onExpandPage: pageCode =>
    dispatch(handleExpandPage(pageCode)),
});


const PageTreeSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(PageTreeSelector);


export default PageTreeSelectorContainer;
