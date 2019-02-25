import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/digital-exchange/settings/list/SettingsListContainer';
import { fetchDigitalExchanges } from 'state/digital-exchange/digital-exchanges/actions';
import { LIST_DIGITAL_EXCHANGES_OK } from 'test/mocks/digital-exchange/digitalExchanges';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { getLoading } from 'state/loading/selectors';
import { MODAL_ID } from 'ui/digital-exchange/settings/list/DeleteSettingsModal';


const TEST_STATE = {
  digitalExchanges: { list: LIST_DIGITAL_EXCHANGES_OK },
};

jest.mock('state/digital-exchange/digital-exchanges/actions', () => ({
  fetchDigitalExchanges: jest.fn(),
}));

jest.mock('state/modal/actions', () => ({
  setVisibleModal: jest.fn(),
  setInfo: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

getLoading.mockReturnValue({ digitalExchangeList: false });

const dispatchMock = jest.fn();

describe('SettingsListContainer', () => {
  it('maps digitalExchanges property state in SettingsListContainer', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      marketplaces: TEST_STATE.digitalExchanges.list,
      loading: false,
    });
  });

  describe('mapDispatchToProps', () => {
    const props = mapDispatchToProps(dispatchMock);

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchDigitalExchanges).toHaveBeenCalled();
    });

    it('should dispatch an action if onClickDelete is called', () => {
      props.onClickDelete({ id: 12, name: 'mine' });
      expect(dispatchMock).toHaveBeenCalled();
      expect(setVisibleModal).toHaveBeenCalledWith(MODAL_ID);
      expect(setInfo).toHaveBeenCalledWith({ type: 'Digital Exchange', id: 12, name: 'mine' });
    });
  });
});
