import { connect } from 'react-redux';

import { fetchProfileTypes, sendPostRefreshProfileType } from 'state/profile-types/actions';
import { getProfileTypeList } from 'state/profile-types/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getLoading } from 'state/loading/selectors';
import ProfileTypeListTable from 'ui/profile-types/list/ProfileTypeListTable';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/profile-types/common/ProfileTypesDeleteModal';

export const mapStateToProps = state => (
  {
    profiletypes: getProfileTypeList(state),
    page: getCurrentPage(state),
    totalItems: getTotalItems(state),
    pageSize: getPageSize(state),
    loading: getLoading(state).profileTypes,
  }
);

export const mapDispatchToProps = dispatch => ({
  onDidMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(fetchProfileTypes(page, '?sort=name'));
  },
  removeProfileType: (code) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'profile type', code }));
  },
  reloadProfileType: (code) => {
    dispatch(sendPostRefreshProfileType(code));
  },
});

const ProfileTypeListTableContainer =
 connect(
   mapStateToProps, mapDispatchToProps, null,
   {
     pure: false,
   },
 )(ProfileTypeListTable);

export default ProfileTypeListTableContainer;
