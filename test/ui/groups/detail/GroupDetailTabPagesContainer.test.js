import 'test/enzyme-init';

import { mapDispatchToProps } from 'ui/groups/detail/GroupDetailTabPagesContainer';

const dispatchMock = jest.fn();

describe('GroupDetailTabPagesContainer', () => {
  describe('mapDispatchToProps', () => {
    let props;
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
});
