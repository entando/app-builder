import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/file-browser/list/FilesListTableContainer';
import { fetchFileList, downloadFile } from 'state/file-browser/actions';

import { FILE_BROWSER } from 'test/mocks/fileBrowser';
import { getFileList, getPathInfo } from 'state/file-browser/selectors';

const path = {
  pathInfo: {
    protectedFolder: false,
    prevPath: 'first',
    currentPath: 'first/second',
  },
};
jest.mock('state/file-browser/selectors', () => ({
  getPathInfo: jest.fn(),
  getFileList: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(() => false),
}));

jest.mock('state/file-browser/actions', () => ({
  fetchFileList: jest.fn(),
  downloadFile: jest.fn(),
}));

downloadFile.mockReturnValue(Promise.resolve(new File([''], 'filename.txt')));

getFileList.mockReturnValue(FILE_BROWSER);
getPathInfo.mockReturnValue(path);

const dispatchMock = jest.fn(() => Promise.resolve({}));

describe('FilesListTableContainer', () => {
  describe('mapStateToProps', () => {
    it('maps files List property state', () => {
      const props = mapStateToProps({});
      expect(props).toHaveProperty('files', FILE_BROWSER);
      expect(props).toHaveProperty('pathInfo', path);
    });
  });
  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
      expect(props.onClickDownload).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchFileList).toHaveBeenCalled();
    });

    it('should dispatch an action if onClickDownload is called', () => {
      props.onClickDownload(new File([''], 'filename.txt'));
      expect(dispatchMock).toHaveBeenCalled();
      expect(downloadFile).toHaveBeenCalled();
    });
  });
});
