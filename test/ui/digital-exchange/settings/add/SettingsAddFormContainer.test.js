import 'test/enzyme-init';

import { mapDispatchToProps } from 'ui/digital-exchange/settings/add/SettingsAddFormContainer';
import { sendPostDEMarketplaces } from 'state/digital-exchange/marketplaces/actions';

jest.mock('state/digital-exchange/marketplaces/actions', () => ({
  sendPostDEMarketplaces: jest.fn(),
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
      expect(sendPostDEMarketplaces).toHaveBeenCalledWith(data);
    });
  });
});
