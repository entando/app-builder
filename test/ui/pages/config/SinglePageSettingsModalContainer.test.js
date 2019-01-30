
import { mapDispatchToProps } from 'ui/pages/config/SinglePageSettingsModalContainer';

const dispatchMock = jest.fn();

describe('SinglePageSettingsModalContainer', () => {
  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onSave).toBeDefined();
      expect(props.onCancel).toBeDefined();
    });

    it('should dispatch an action if onSave is called', () => {
      props.onSave();
      expect(dispatchMock).toHaveBeenCalled();
    });

    it('should dispatch an action if onCancel is called', () => {
      props.onCancel();
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
