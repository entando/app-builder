import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserRefs } from 'state/roles/selectors';
import { fetchUserRefs } from 'state/roles/actions';
import { getLoading } from 'state/loading/selectors';

import UserRefsTable from 'ui/common/references/UserRefsTable';

export const mapStateToProps = (state, { match: { params } }) => ({
  roleCode: params.roleCode,
  userReferences: getUserRefs(state),
  loading: getLoading(state).references,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ roleCode }) => {
    dispatch(fetchUserRefs(roleCode));
  },
});

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps, null,
  {
    pure: false,
  },
)(UserRefsTable));
