import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/users/list/UserSearchFormContainer';
import { PROFILE_TYPES_NORMALIZED, PROFILE_TYPES_OPTIONS } from 'test/mocks/profileTypes';

const TEST_STATE = {
  profileTypes: PROFILE_TYPES_NORMALIZED.profileTypes,
  users: {
    searchTerm: '',
  },
};

const page = 1;
const SEARCH_FORM_VALUES = {
  username: 'user1',
  withProfile: 'with',
  profileType: 'PFL',
};

const dispatchMock = jest.fn();

describe('FragmentSearchFormContainer', () => {
  it('maps profileTypes property state in UserSearchFormContainer', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      profileTypes: PROFILE_TYPES_OPTIONS,
      initialValues: { withProfile: 'all', username: '' },

    });
  });

  it('verify that onDidMount is defined by mapDispatchToProps', () => {
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onDidMount).toBeDefined();
    result.onDidMount();
    expect(dispatchMock).toHaveBeenCalled();
  });
  it('verify that onSubmit is defined by mapDispatchToProps', () => {
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onSubmit).toBeDefined();
    result.onSubmit(page, SEARCH_FORM_VALUES);
    expect(dispatchMock).toHaveBeenCalled();
  });
});
