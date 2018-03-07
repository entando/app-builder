import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/fragments/list/FragmentListTableContainer';
import { LIST_FRAGMENTS_OK } from 'test/mocks/fragments';

const TEST_STATE = {
  fragmentList: LIST_FRAGMENTS_OK.payload,
  otherProperties: true,
};

const dispatchMock = jest.fn();

describe('FragmentListTableContainer', () => {
  it('maps fragmentList property state in FragmentListTable', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({ fragments: TEST_STATE.fragmentList });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
