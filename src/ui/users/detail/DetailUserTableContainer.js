import { connect } from 'react-redux';
import DetailUserTable from 'ui/users/detail/DetailUserTable';
import { fetchUserDetail } from 'state/users/actions';
import { getUser } from 'state/users/selectors';

import { getParams } from 'frontend-common-components';

export const mapStateToProps = state => ({
  username: getParams(state).username,
  user: getUser(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (username) => {
    dispatch(fetchUserDetail(username));
  },
});

const DetailUserTableContainer = connect(mapStateToProps, mapDispatchToProps)(DetailUserTable);
export default DetailUserTableContainer;
