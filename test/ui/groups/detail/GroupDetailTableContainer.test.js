import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/groups/detail/GroupDetailTableContainer';
import { getSelectedGroup } from 'state/groups/selectors';
import { LIST_GROUPS_OK } from 'test/mocks/groups';


const dispatchMock = jest.fn();

const INITIAL_STATE = {
  state: {
    group: {
      selected: {},
    },
  },
};

jest.mock('state/groups/selectors', () => ({
  getSelectedGroup: jest.fn(),
}));

getSelectedGroup.mockReturnValue(LIST_GROUPS_OK[1]);

describe('GroupDetailTableContainer', () => {
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
      props = mapStateToProps(INITIAL_STATE);
    });

    it('verify that group prop is defined and properly valued', () => {
      props = mapStateToProps(INITIAL_STATE);
      expect(typeof props.group).toEqual('object');
    });
  });
});
