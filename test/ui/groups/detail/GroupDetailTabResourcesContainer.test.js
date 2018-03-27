import 'test/enzyme-init';

import { mapDispatchToProps, mapStateToProps } from 'ui/groups/detail/GroupDetailTabResourcesContainer';
import { getSelectedGroupResourceReferences } from 'state/groups/selectors';
import { RESOURCE_REFERENCES } from 'test/mocks/groups';

const dispatchMock = jest.fn();
const RESOURCES_MOCK = [{
  code: 'sample-image-1',
  name: 'Sample image 1',
  type: 'Image',
}];

jest.mock('state/groups/selectors', () => ({
  getSelectedGroupResourceReferences: jest.fn(),
}));

getSelectedGroupResourceReferences.mockReturnValue(RESOURCE_REFERENCES.administrators.list);

describe('GroupDetailTabWidgetsContainer', () => {
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
      props = mapStateToProps(RESOURCE_REFERENCES.administrators);
    });

    it('verify props are defined and properly valued', () => {
      expect.assertions(3);
      expect(props).toBeInstanceOf(Object);
      expect(props).toHaveProperty('pageReferences');
      expect(props).toMatchObject({
        pageReferences: RESOURCES_MOCK,
        page: 1,
        totalItems: 1,
        pageSize: 5,
      });
    });
  });
});
