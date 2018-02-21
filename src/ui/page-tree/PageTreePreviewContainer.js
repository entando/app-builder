
import { connect } from 'react-redux';

import PageTreePreview from 'ui/page-tree/PageTreePreview';

import { getLocale } from 'state/locale/selectors';


export const mapStateToProps = state => ({
  locale: getLocale(state),
});


const PageTreeContainer = connect(mapStateToProps, null)(PageTreePreview);


export default PageTreeContainer;
