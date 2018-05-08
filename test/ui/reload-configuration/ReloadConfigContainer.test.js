import 'test/enzyme-init';
import { mapDispatchToProps } from 'ui/reload-configuration/ReloadConfigContainer';

jest.mock('state/reload-configuration/actions', () => ({
  sendReloadConf: jest.fn().mockReturnValue('sendReloadConf_result'),
}));

describe('ReloadConfigContainer', () => {
  const dispatchMock = jest.fn();

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('maps the "onReload" prop a sendReloadConf', () => {
      expect(props.onReload).toBeDefined();
      props.onReload();
      expect(dispatchMock).toHaveBeenCalledWith('sendReloadConf_result');
    });
  });
});
