import { mapDispatchToProps, mapStateToProps } from 'ui/users/edit/EditFormContainer';
import { getParams } from 'frontend-common-components';

const TEST_STATE = {
  mode: 'edit',
  username: 'test',
};

getParams.mockReturnValue(TEST_STATE);

describe('EditFormContainer', () => {
  const dispatchMock = jest.fn();
  let props;
  beforeEach(() => {
    jest.clearAllMocks();
    props = mapDispatchToProps(dispatchMock);
  });

  describe('mapDispatchToProps', () => {
    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
      expect(props.onSubmit).toBeDefined();
    });
    it('verify thant onWillMount is called', () => {
      props.onWillMount('username');
      expect(dispatchMock).toHaveBeenCalled();
    });
    it('verify thant onSubmit is called', () => {
      props.onSubmit({});
      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    it('verify that username prop is defined and properly valued', () => {
      props = mapStateToProps(TEST_STATE);
      expect(props.username).toBeDefined();
      expect(props.username).toEqual(TEST_STATE.username);
    });
  });
});
