import 'test/enzyme-init';

import { mapDispatchToProps, mapStateToProps } from 'ui/groups/detail/GroupDetailTabUsersContainer';
import { getSelectedGroupUserReferences, getReferencesLoading } from 'state/groups/selectors';
import { USER_REFERENCES } from 'test/mocks/groups';

const dispatchMock = jest.fn();
const USERS_MOCK = [{
  username: 'admin',
  fullName: 'Administrators',
  lastLogin: '2018-01-08 00:00:00',
  status: 'active',
}];

jest.mock('state/groups/selectors', () => ({
  getSelectedGroupUserReferences: jest.fn(),
  getReferencesLoading: jest.fn(),
}));

getSelectedGroupUserReferences.mockReturnValue(USER_REFERENCES.administrators.list);
getReferencesLoading.mockReturnValue(false);

describe('GroupDetailTabUsersContainer', () => {
  let props;
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount();
      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      props = mapStateToProps(USER_REFERENCES.administrators);
    });

    it('verify props are defined and properly valued', () => {
      expect.assertions(4);
      expect(props).toBeInstanceOf(Object);
      expect(props).toHaveProperty('pageReferences');
      expect(props).toHaveProperty('loading');
      expect(props).toMatchObject({
        pageReferences: USERS_MOCK,
        page: 1,
        totalItems: 1,
        pageSize: 5,
      });
    });
  });
});
