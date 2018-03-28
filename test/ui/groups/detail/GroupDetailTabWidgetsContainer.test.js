import 'test/enzyme-init';

import { mapDispatchToProps, mapStateToProps } from 'ui/groups/detail/GroupDetailTabWidgetsContainer';
import { getSelectedGroupWidgetTypeReferences, getReferencesLoading } from 'state/groups/selectors';
import { WIDGETTYPE_REFERENCES } from 'test/mocks/groups';

const dispatchMock = jest.fn();
const WIDGETS_MOCK = [{
  code: 'banner-content-left',
  title: 'Banner content left',
}];

jest.mock('state/groups/selectors', () => ({
  getSelectedGroupWidgetTypeReferences: jest.fn(),
  getReferencesLoading: jest.fn(),
}));

getSelectedGroupWidgetTypeReferences.mockReturnValue(WIDGETTYPE_REFERENCES.administrators.list);
getReferencesLoading.mockReturnValue(false);

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
      props = mapStateToProps(WIDGETTYPE_REFERENCES.administrators);
    });

    it('verify props are defined and properly valued', () => {
      expect.assertions(4);
      expect(props).toBeInstanceOf(Object);
      expect(props).toHaveProperty('pageReferences');
      expect(props).toHaveProperty('loading');
      expect(props).toMatchObject({
        pageReferences: WIDGETS_MOCK,
        page: 1,
        totalItems: 1,
        pageSize: 5,
      });
    });
  });
});
