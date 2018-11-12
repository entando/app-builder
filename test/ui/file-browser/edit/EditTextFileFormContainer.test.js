import 'test/enzyme-init';
import { gotoRoute } from '@entando/router';
import { mapDispatchToProps } from 'ui/file-browser/edit/EditTextFileFormContainer';
import { saveFile, fetchFile, downloadFile } from 'state/file-browser/actions';

jest.mock('state/file-browser/actions', () => ({
  saveFile: jest.fn(),
  fetchFile: jest.fn(),
  downloadFile: jest.fn(),
}));

jest.mock('@entando/router');
const dispatchMock = jest.fn(() => Promise.resolve({}));

describe('ui/file-browser/add/EditTextFileFormContainer', () => {
  let props;
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });
    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
      expect(props.onClickDownload).toBeDefined();
      expect(props.onSubmit).toBeDefined();
    });

    it('should dispatch action saveFile if button save is called', () => {
      props.onSubmit({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(saveFile).toHaveBeenCalled();
    });

    it('should dispatch action fetchfile when componentWillMount is called', () => {
      props.onWillMount('filename.txt', ['.txt', '.css']);
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchFile).toHaveBeenCalledWith('filename.txt', ['.txt', '.css']);
    });

    it('should dispatch gotoRoute when componentWillMount is called with wrong file extension', () => {
      const dispatchMockReject = jest.fn(() => Promise.reject());
      props = mapDispatchToProps(dispatchMockReject);
      props.onWillMount('filename.md', ['.txt', '.css']);
      expect(dispatchMockReject).toHaveBeenCalled();
      dispatchMockReject().catch(() => {
        expect(gotoRoute).toHaveBeenCalled();
      });
    });

    it('should dispatch action downloadFile when click icon download', () => {
      props.onClickDownload(new File([''], 'filename.txt'));
      expect(dispatchMock).toHaveBeenCalled();
      expect(downloadFile).toHaveBeenCalled();
    });
  });
});
