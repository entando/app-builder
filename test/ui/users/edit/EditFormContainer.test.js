import { mapDispatchToProps, mapStateToProps } from 'ui/users/edit/EditFormContainer';

const ownProps = {
  match: {
    params: {
      mode: 'edit',
      username: 'test',
    },
  },
};

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
      props = mapStateToProps({}, ownProps);
      expect(props.mode).toEqual('edit');
      expect(props.username).toEqual('test');
    });
  });
});
