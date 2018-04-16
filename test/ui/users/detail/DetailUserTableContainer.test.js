import { mapStateToProps, mapDispatchToProps } from 'ui/users/detail/DetailUserTableContainer';
import { getSelectedUser } from 'state/users/selectors';
import { getParams } from '@entando/router';
import { USER_PROFILE_MOCK } from 'test/mocks/users';

jest.mock('state/users/selectors', () => ({
  getSelectedUser: jest.fn(),
}));

getParams.mockReturnValue(USER_PROFILE_MOCK.admin);

getSelectedUser.mockReturnValue(USER_PROFILE_MOCK.admin);


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

    it('verify that user prop is defined and properly valued', () => {
      props = mapStateToProps(USER_PROFILE_MOCK);
      expect(typeof props.user).toEqual('object');
    });
  });
});
