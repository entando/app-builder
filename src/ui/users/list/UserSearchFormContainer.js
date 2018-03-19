import { connect } from 'react-redux';
import { fetchUsers } from 'state/users/actions';
import { fetchProfileTypes } from 'state/profile-types/actions';
import { getProfileTypesOptions } from 'state/profile-types/selectors';
import UserSearchForm from 'ui/users/list/UserSearchForm';
import { convertToQueryString, FILTER_OPERATORS } from 'util/queryStringManager';

const FIELD_OPERATORS = {
  username: FILTER_OPERATORS.LIKE,
};


export const mapStateToProps = state => ({
  profileTypes: getProfileTypesOptions(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchProfileTypes());
  },
  // calls search API when available
  onSubmit: (values) => {
    dispatch(fetchUsers(1, convertToQueryString({
      formValues: values,
      operators: FIELD_OPERATORS,
      sorting: {
        attribute: 'username',
      },
    })));
  },
});

const UserSearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserSearchForm);
export default UserSearchFormContainer;
