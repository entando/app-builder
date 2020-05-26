import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PagesDetailPage from 'ui/pages/detail/PagesDetailPage';
import { loadSelectedPage, setReferenceSelectedPage } from 'state/pages/actions';
import { getReferencesFromSelectedPage } from 'state/pages/selectors';
import withPermissions from 'ui/auth/withPermissions';
import { MANAGE_PAGES_PERMISSION } from 'state/permissions/const';

export const mapStateToProps = (state, { match: { params } }) => ({
  pageCode: params.pageCode,
  references: getReferencesFromSelectedPage(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: props =>
    dispatch(loadSelectedPage(props.pageCode)).then(() => {
      dispatch(setReferenceSelectedPage());
    }),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(withPermissions(MANAGE_PAGES_PERMISSION)(PagesDetailPage)));
