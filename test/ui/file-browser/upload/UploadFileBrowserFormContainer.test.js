import 'test/enzyme-init';
import { mapDispatchToProps } from 'ui/file-browser/upload/UploadFileBrowserFormContainer';
import { saveFile } from 'state/file-browser/actions';

jest.mock('state/file-browser/actions', () => ({
  saveFile: jest.fn(),
}));

const dispatchMock = jest.fn();
describe('ui/file-browser/upload/UploadFileBrowserFormContainer', () => {
  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onSubmit).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onSubmit({ file: { files: [{ id: 1 }] } });
      expect(dispatchMock).toHaveBeenCalled();
      expect(saveFile).toHaveBeenCalled();
    });
  });
});
