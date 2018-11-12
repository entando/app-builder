import 'test/enzyme-init';
import { mapDispatchToProps } from 'ui/file-browser/add/CreateTextFileFormContainer';
import { saveFile } from 'state/file-browser/actions';

jest.mock('state/file-browser/actions', () => ({
  saveFile: jest.fn(),
}));

const dispatchMock = jest.fn();

describe('ui/file-browser/add/CreateTextFileFormContainer', () => {
  let props;
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });
    it('should map the correct function properties', () => {
      expect(props.onSubmit).toBeDefined();
    });

    it('should dispatch an action if onClickStartBackup is called', () => {
      props.onSubmit({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(saveFile).toHaveBeenCalled();
    });
  });
});
