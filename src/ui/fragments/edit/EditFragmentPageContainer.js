import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditFragmentPage from 'ui/fragments/edit/EditFragmentPage';
import { fetchFragment } from 'state/fragments/actions';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

export const mapStateToProps = (state, { match: { params } }) => (
  {
    fragmentCode: params.fragmentCode,
  });

export const mapDispatchToProps = dispatch => ({
  onWillMount: (props) => {
    dispatch(fetchFragment(props.fragmentCode));
  },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(withPermissions(SUPERUSER_PERMISSION)(EditFragmentPage)));
