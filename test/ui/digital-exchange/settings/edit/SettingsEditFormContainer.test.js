import 'test/enzyme-init';
import { getParams } from '@entando/router';

import { mapStateToProps, mapDispatchToProps } from 'ui/digital-exchange/settings/edit/SettingsEditFormContainer';
import { sendPutDEMarketplaces, fetchDEMarketplace } from 'state/digital-exchange/marketplaces/actions';

jest.mock('state/digital-exchange/marketplaces/actions', () => ({
  sendPutDEMarketplaces: jest.fn(),
  fetchDEMarketplace: jest.fn(),
}));


const dispatchMock = jest.fn();

getParams.mockReturnValue({
  server: 33,
});

describe('SettingsListContainer', () => {
  describe('mapStateToProps', () => {
    let props = {};

    beforeAll(() => {
      props = mapStateToProps({});
    });

    it('assigns the correct id value', () => {
      expect(props).toHaveProperty('id', 33);
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeAll(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onSubmit).toBeDefined();
      expect(props.onWillMount).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount(12);
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchDEMarketplace).toHaveBeenCalledWith(12, true);
    });

    it('should dispatch an action if onSubmit is called', () => {
      const data = { id: 11 };
      props.onSubmit(data);
      expect(dispatchMock).toHaveBeenCalled();
      expect(sendPutDEMarketplaces).toHaveBeenCalledWith(data);
    });
  });
});
