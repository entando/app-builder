import { mapStateToProps, mapDispatchToProps } from 'ui/users/detail/DetailUserTableContainer';
import { getUser } from 'state/users/selectors';
import { getParams } from 'frontend-common-components';
import { USER_PROFILE_MOCK } from 'test/mocks/users';

jest.mock('state/users/selectors', () => ({
  getUser: jest.fn(),
}));

getParams.mockReturnValue(USER_PROFILE_MOCK.admin);

getUser.mockReturnValue(USER_PROFILE_MOCK.admin);


describe('DetailUserTableContainer', () => {
  const dispatchMock = jest.fn();
  let props;
  beforeEach(() => {
    jest.clearAllMocks();
    props = mapDispatchToProps(dispatchMock);
  });

  describe('mapDispatchToProps', () => {
    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
    });
    it('verify thant onWillMount is called', () => {
      props.onWillMount('username');
      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      props = mapStateToProps(USER_PROFILE_MOCK);
    });

    it('verify that username prop is defined and properly valued', () => {
      expect(props).toHaveProperty('username', 'admin');
    });

    it('verify that user prop is defined and properly valued', () => {
      props = mapStateToProps(USER_PROFILE_MOCK);
      expect(typeof props.user).toEqual('object');
    });
  });
});
