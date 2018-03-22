import { connect } from 'react-redux';
import DetailUserTable from 'ui/users/detail/DetailUserTable';
import { fetchCurrentPageUserDetail } from 'state/users/actions';
import { getSelectedUser } from 'state/users/selectors';

export const mapStateToProps = state => ({
  user: getSelectedUser(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchCurrentPageUserDetail());
  },
});

const DetailUserTableContainer = connect(mapStateToProps, mapDispatchToProps)(DetailUserTable);
export default DetailUserTableContainer;
