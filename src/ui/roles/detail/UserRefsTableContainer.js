import { connect } from 'react-redux';
import { getUserRefs } from 'state/roles/selectors';
import { fetchUserRefs } from 'state/roles/actions';
import { getParams } from 'frontend-common-components';
import { getLoading } from 'state/loading/selectors';

import UserRefsTable from 'ui/common/references/UserRefsTable';

export const mapStateToProps = state => ({
  roleCode: getParams(state).roleCode,
  userReferences: getUserRefs(state),
  loading: getLoading(state).references,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ roleCode }) => {
    dispatch(fetchUserRefs(roleCode));
  },
});

const UserRefsTableContainer = connect(mapStateToProps, mapDispatchToProps)(UserRefsTable);
export default UserRefsTableContainer;
