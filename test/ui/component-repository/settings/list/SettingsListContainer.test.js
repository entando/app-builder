import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/component-repository/settings/list/SettingsListContainer';
import { fetchComponentRepositories } from 'state/component-repository/component-repositories/actions';
import { LIST_COMPONENT_REPOSITORIES_OK } from 'test/mocks/component-repository/componentRepositories';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { getLoading } from 'state/loading/selectors';
import { MODAL_ID } from 'ui/component-repository/settings/list/DeleteSettingsModal';


const TEST_STATE = {
  componentRepositories: { list: LIST_COMPONENT_REPOSITORIES_OK },
};

jest.mock('state/component-repository/component-repositories/actions', () => ({
  fetchComponentRepositories: jest.fn(),
}));

jest.mock('state/modal/actions', () => ({
  setVisibleModal: jest.fn(),
  setInfo: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

getLoading.mockReturnValue({ componentRepositoryList: false });

const dispatchMock = jest.fn();

describe('SettingsListContainer', () => {
  it('maps componentRepositories property state in SettingsListContainer', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      marketplaces: TEST_STATE.componentRepositories.list,
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
      expect(fetchComponentRepositories).toHaveBeenCalled();
    });

    it('should dispatch an action if onClickDelete is called', () => {
      props.onClickDelete({ id: 12, name: 'mine' });
      expect(dispatchMock).toHaveBeenCalled();
      expect(setVisibleModal).toHaveBeenCalledWith(MODAL_ID);
      expect(setInfo).toHaveBeenCalledWith({ type: 'Component Repository', id: 12, name: 'mine' });
    });
  });
});
