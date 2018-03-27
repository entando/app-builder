import 'test/enzyme-init';

import { mapDispatchToProps, mapStateToProps } from 'ui/groups/detail/GroupDetailTabContentsContainer';
import { getSelectedGroupContentReferences } from 'state/groups/selectors';
import { GROUP_CONTENT_REFERENCES } from 'test/mocks/groups';

const dispatchMock = jest.fn();
const CONTENTS_MOCK = [{
  code: 'CNG2',
  name: 'Banner content left',
  type: 'Generic Content',
  lastEdit: '2017-01-08 00:00:00',
}];

jest.mock('state/groups/selectors', () => ({
  getSelectedGroupContentReferences: jest.fn(),
}));

getSelectedGroupContentReferences.mockReturnValue(GROUP_CONTENT_REFERENCES.administrators.list);

describe('GroupDetailTabContentsContainer', () => {
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
      props = mapStateToProps(GROUP_CONTENT_REFERENCES.administrators);
    });

    it('verify props are defined and properly valued', () => {
      expect.assertions(3);
      expect(props).toBeInstanceOf(Object);
      expect(props).toHaveProperty('pageReferences');
      expect(props).toMatchObject({
        pageReferences: CONTENTS_MOCK,
        page: 1,
        totalItems: 1,
        pageSize: 5,
      });
    });
  });
});
