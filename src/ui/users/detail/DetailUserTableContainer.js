import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DetailUserTable from 'ui/users/detail/DetailUserTable';
import { fetchCurrentPageUserDetail } from 'state/users/actions';
import { getSelectedUser } from 'state/users/selectors';

export const mapStateToProps = state => ({
  user: getSelectedUser(state),
});

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onWillMount: () => {
    dispatch(fetchCurrentPageUserDetail(params.username));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailUserTable));
