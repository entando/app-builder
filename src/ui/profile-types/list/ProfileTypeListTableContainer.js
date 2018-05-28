import { connect } from 'react-redux';

import { fetchProfileTypes } from 'state/profile-types/actions';
import { getProfileTypeList } from 'state/profile-types/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getLoading } from 'state/loading/selectors';
import ProfileTypeListTable from 'ui/profile-types/list/ProfileTypeListTable';

export const mapStateToProps = state => (
  {
    profiletypes: getProfileTypeList(state),
    page: getCurrentPage(state),
    totalItems: getTotalItems(state),
    pageSize: getPageSize(state),
    loading: getLoading(state).profileType,
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(fetchProfileTypes(page));
  },
});

const ProfileTypeListTableContainer =
 connect(mapStateToProps, mapDispatchToProps)(ProfileTypeListTable);

export default ProfileTypeListTableContainer;
