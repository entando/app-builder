import 'test/enzyme-init';
import { PROFILE_TYPES_NORMALIZED, PROFILE_TYPES_OPTIONS } from 'test/mocks/profileTypes';
import { mapStateToProps, mapDispatchToProps } from 'ui/users/add/AddFormContainer';

describe('AddFormContainer', () => {
  const dispatchMock = jest.fn();
  describe('mapDispatchToProps', () => {
    it('verify that onSubmit is defined by mapDispatchToProps', () => {
      const result = mapDispatchToProps(dispatchMock);
      expect(result.onSubmit).toBeDefined();
    });

    it('verify that onWillMount is defined by mapDispatchToProps', () => {
      const result = mapDispatchToProps(dispatchMock);
      expect(result.onWillMount).toBeDefined();
      result.onWillMount();
      expect(dispatchMock).toHaveBeenCalled();
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
