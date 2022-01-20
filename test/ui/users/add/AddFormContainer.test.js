import 'test/enzyme-init';
import { PROFILE_TYPES_NORMALIZED, PROFILE_TYPES_OPTIONS } from 'test/mocks/profileTypes';
import { mapStateToProps, mapDispatchToProps } from 'ui/users/add/AddFormContainer';
import { sendPostUser } from 'state/users/actions';
import { fetchProfileTypes } from 'state/profile-types/actions';

const dispatchMock = jest.fn();

jest.mock('state/users/actions', () => ({
  sendPostUser: jest.fn(),
}));

jest.mock('state/profile-types/actions', () => ({
  fetchProfileTypes: jest.fn(),
}));

describe('AddFormContainer', () => {
  describe('mapDispatchToProps', () => {
    let result;
    beforeEach(() => {
      result = mapDispatchToProps(dispatchMock, {});
    });
    it('verify that onSubmit is defined by mapDispatchToProps', () => {
      expect(result).toHaveProperty('onSubmit');
      result.onSubmit({});
      expect(sendPostUser).toHaveBeenCalled();
    });

    it('verify that onWillMount is defined by mapDispatchToProps', () => {
      expect(result).toHaveProperty('onWillMount');
      result.onWillMount();
      expect(fetchProfileTypes).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    it('verify that profileTypes prop is defined and properly valued', () => {
      const props = mapStateToProps(PROFILE_TYPES_NORMALIZED);
      expect(props.profileTypes).toBeDefined();
      expect(props.profileTypes).toEqual(PROFILE_TYPES_OPTIONS);
    });
  });
});
