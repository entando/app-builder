
import { connect } from 'react-redux';

import PageTreePage from 'ui/pages/list/PageTreePage';

import { handleExpandPage } from 'state/pages/actions';

import { getLocale } from 'state/locale/selectors';


export const mapStateToProps = state => ({
  locale: getLocale(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => dispatch(handleExpandPage()),
});


const PageTreeContainer = connect(mapStateToProps, mapDispatchToProps)(PageTreePage);


export default PageTreeContainer;
