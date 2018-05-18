import 'test/enzyme-init';

import { mapStateToProps } from 'ui/file-browser/common/FileButtonsGroupContainer';
import { getPathInfo } from 'state/file-browser/selectors';

const path = {
  pathInfo: {
    protectedFolder: false,
    prevPath: 'first',
    currentPath: 'first/second',
  },
};
jest.mock('state/file-browser/selectors', () => ({
  getPathInfo: jest.fn(),
}));

getPathInfo.mockReturnValue(path);

describe('FileButtonsGroupContainer', () => {
  describe('mapStateToProps', () => {
    it('maps PathInfo property state', () => {
      const props = mapStateToProps({});
      expect(props).toHaveProperty('pathInfo', path);
    });
  });
});
