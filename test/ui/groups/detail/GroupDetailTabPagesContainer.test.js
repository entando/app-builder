import 'test/enzyme-init';

import { mapDispatchToProps, mapStateToProps } from 'ui/groups/detail/GroupDetailTabPagesContainer';
import { getSelectedGroupPageReferences } from 'state/groups/selectors';
import { PAGE_REFERENCES } from 'test/mocks/groups';

const dispatchMock = jest.fn();

jest.mock('state/groups/selectors', () => ({
  getSelectedGroupPageReferences: jest.fn(),
}));

getSelectedGroupPageReferences.mockReturnValue(PAGE_REFERENCES.administrators.list);

describe('GroupDetailTabPagesContainer', () => {
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
      props = mapStateToProps(PAGE_REFERENCES.administrators);
    });

    it('verify props are defined and properly valued', () => {
      expect.assertions(3);
      expect(props).toBeInstanceOf(Object);
      expect(props).toHaveProperty('pageReferences');
      expect(props).toMatchObject({
        pageReferences:
       [{ code: 'homepage', name: 'Home page' },
         { code: 'dashboard', name: 'Dashboard' }],
        page: 1,
        totalItems: 3,
        pageSize: 5,
      });
    });
  });
});
