import { mapDispatchToProps } from 'ui/users/edit/EditFormContainer';

describe('EditFormContainer', () => {
  const dispatchMock = jest.fn();
  let props;
  beforeEach(() => {
    props = mapDispatchToProps(dispatchMock);
  });

  describe('mapDispatchToProps', () => {
    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
    });
  });
});
