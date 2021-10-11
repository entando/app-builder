import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CloneFragmentPage from 'ui/fragments/clone/CloneFragmentPage';
import { fetchFragment } from 'state/fragments/actions';
import { FORM_MODE_CLONE } from 'state/fragments/const';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

export const mapStateToProps = (state, { match: { params } }) => (
  {
    fragmentCode: params.fragmentCode,
  });

export const mapDispatchToProps = dispatch => ({
  onWillMount: (props) => {
    dispatch(fetchFragment(props.fragmentCode, FORM_MODE_CLONE));
  },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(withPermissions(SUPERUSER_PERMISSION)(CloneFragmentPage)));
