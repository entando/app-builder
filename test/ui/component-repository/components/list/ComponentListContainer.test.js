import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/component-repository/components/list/ComponentListContainer';
import { fetchECRComponents } from 'state/component-repository/components/actions';
import { LIST_ECR_COMPONENTS_OK } from 'test/mocks/component-repository/components';
import { getLoading } from 'state/loading/selectors';

const TEST_STATE = {
  componentRepositoryComponents: { list: LIST_ECR_COMPONENTS_OK },
  pagination: { global: {} },
};

jest.mock('state/component-repository/components/actions', () => ({
  fetchECRComponents: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

getLoading.mockReturnValue(false);

const dispatchMock = jest.fn();

describe('ComponentListContainer', () => {
  it('maps componentRepositoryComponents property state in ComponentListContainer', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      componentRepositoryComponents: TEST_STATE.componentRepositoryComponents.list,
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onDidMount).toBeDefined();
    });

    it('should dispatch an action if onDidMount is called', () => {
      props.onDidMount({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchECRComponents).toHaveBeenCalled();
    });
  });
});
