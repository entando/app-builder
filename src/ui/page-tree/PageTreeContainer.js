
import { connect } from 'react-redux';

import PageTree from 'ui/page-tree/PageTree';

import {
  togglePageExpanded,
} from 'state/page-tree/actions';

import { getPageTreePages } from 'state/page-tree/selectors';
import { getLocale } from 'state/locale/selectors';


export const mapStateToProps = state => ({
  pages: getPageTreePages(state),
  locale: getLocale(state),
});

export const mapDispatchToProps = dispatch => ({
  onDropIntoPage: (sourcePageCode, targetPageCode) => console.log(`dragged ${sourcePageCode} into ${targetPageCode}`),
  onDropAbovePage: (sourcePageCode, targetPageCode) => console.log(`dragged ${sourcePageCode} above ${targetPageCode}`),
  onDropBelowPage: (sourcePageCode, targetPageCode) => console.log(`dragged ${sourcePageCode} below ${targetPageCode}`),
  onExpandPage: pageCode => dispatch(togglePageExpanded(pageCode)),
});


const PageTreeContainer = connect(mapStateToProps, mapDispatchToProps)(PageTree);


export default PageTreeContainer;
