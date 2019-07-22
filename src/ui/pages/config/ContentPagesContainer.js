import { connect } from 'react-redux';
import { handleExpandPage } from 'state/pages/actions';
import { getPageTreePages } from 'state/pages/selectors';
import ContentPages from 'ui/pages/config/ContentPages';

export const mapStateToProps = state => ({
  pages: getPageTreePages(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => dispatch(handleExpandPage()),
  onExpandPage: pageCode =>
    dispatch(handleExpandPage(pageCode)),

});

export default connect(mapStateToProps, mapDispatchToProps)(ContentPages);
