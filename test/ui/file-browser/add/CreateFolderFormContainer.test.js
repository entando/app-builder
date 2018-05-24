import 'test/enzyme-init';

import { mapDispatchToProps } from 'ui/file-browser/add/CreateFolderFormContainer';
import { sendPostCreateFolder } from 'state/file-browser/actions';

jest.mock('state/file-browser/actions', () => ({
  sendPostCreateFolder: jest.fn(),
}));

const dispatchMock = jest.fn();
describe('CreateFolderFormContainer', () => {
  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onSubmit).toBeDefined();
    });

    it('verify that the "onSubmit" is defined by and dispatch sendPostCreateFolder', () => {
      props.onSubmit({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(sendPostCreateFolder).toHaveBeenCalled();
    });
  });
});
