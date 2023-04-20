import { connect } from 'react-redux';
import { fetchUsers, setUserSearchTerm } from 'state/users/actions';
import { fetchProfileTypes } from 'state/profile-types/actions';
import { getProfileTypesOptions } from 'state/profile-types/selectors';
import UserSearchForm from 'ui/users/list/UserSearchForm';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import { PROFILE_FILTER_VALUE_MAP, PROFILE_FILTER_OPTIONS } from 'ui/users/common/const';
import { getUserSearchTerm } from 'state/users/selectors';

const FIELD_OPERATORS = {
  username: FILTER_OPERATORS.LIKE,
};

export const generateQueryString = (values) => {
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
    username: getUserSearchTerm(state) || '',
  },
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch(fetchProfileTypes());
  },
  onSubmit: (values) => {
    dispatch(setUserSearchTerm(values.username));
    return dispatch(fetchUsers({ page: 1, pageSize: 10 }, values.username ? generateQueryString(values) : ''));
  },
  onUnmount: () => {
    dispatch(setUserSearchTerm(''));
  },
});

const UserSearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false },
)(UserSearchForm);
export default UserSearchFormContainer;
