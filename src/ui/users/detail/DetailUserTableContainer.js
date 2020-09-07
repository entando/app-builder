import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getDomain } from '@entando/apimanager';
import DetailUserTable from 'ui/users/detail/DetailUserTable';
import { fetchCurrentPageUserDetail } from 'state/users/actions';
import { getSelectedUser } from 'state/users/selectors';
import { getLocale } from 'state/locale/selectors';

export const mapStateToProps = state => ({
  user: getSelectedUser(state),
  locale: getLocale(state),
  domain: getDomain(state),
});

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onWillMount: () => {
    dispatch(fetchCurrentPageUserDetail(params.username));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailUserTable));
