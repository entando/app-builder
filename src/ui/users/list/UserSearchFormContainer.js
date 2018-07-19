import { connect } from 'react-redux';
import { fetchUsers } from 'state/users/actions';
import { fetchProfileTypes } from 'state/profile-types/actions';
import { getProfileTypesOptions } from 'state/profile-types/selectors';
import UserSearchForm from 'ui/users/list/UserSearchForm';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import { PROFILE_FILTER_VALUE_MAP, PROFILE_FILTER_OPTIONS } from 'ui/users/common/const';

const FIELD_OPERATORS = {
  username: FILTER_OPERATORS.LIKE,
};

const generateQueryString = (values) => {
  const newValues = { ...values };
  delete newValues.withProfile;
  const withProfile = PROFILE_FILTER_VALUE_MAP[values.withProfile] !== null ?
    `&withProfile=${PROFILE_FILTER_VALUE_MAP[values.withProfile]}` : '';
  return convertToQueryString({
    formValues: newValues,
    operators: FIELD_OPERATORS,
    sorting: {
      attribute: 'username',
    },
  }).concat(withProfile);
};

export const mapStateToProps = state => ({
  profileTypes: getProfileTypesOptions(state),
  initialValues: {
    withProfile: PROFILE_FILTER_OPTIONS[0].id,
  },
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchProfileTypes());
  },
  onSubmit: (values) => {
    dispatch(fetchUsers({ page: 1, pageSize: 10 }, generateQueryString(values)));
  },
});

const UserSearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserSearchForm);
export default UserSearchFormContainer;
