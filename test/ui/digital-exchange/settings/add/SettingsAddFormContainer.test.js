import 'test/enzyme-init';

import { mapDispatchToProps } from 'ui/digital-exchange/settings/add/SettingsAddFormContainer';
import { sendPostDigitalExchange } from 'state/digital-exchange/digital-exchanges/actions';

jest.mock('state/digital-exchange/digital-exchanges/actions', () => ({
  sendPostDigitalExchange: jest.fn(),
}));


const dispatchMock = jest.fn();

describe('SettingsListContainer', () => {
  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onSubmit).toBeDefined();
    });

    it('should dispatch an action if onSubmit is called', () => {
      const data = { id: 12 };
      props.onSubmit(data);
      expect(dispatchMock).toHaveBeenCalled();
      expect(sendPostDigitalExchange).toHaveBeenCalledWith(data);
    });
  });
});
