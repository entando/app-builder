import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/data-types/common/DataTypeReferenceStatusContainer';
import { fetchDataTypeReferenceStatus } from 'state/data-types/actions';

jest.mock('state/data-types/selectors', () => ({
  getDataTypeReferencesStatus: jest.fn(),
}));

jest.mock('state/data-types/actions', () => ({
  fetchDataTypeReferenceStatus: jest.fn(),
}));

const dispatchMock = jest.fn();

describe('ui/data-types/common/DataTypeReferenceStatusContainer', () => {
  describe('mapStateToProps', () => {
    it('maps info property from state', () => {
      expect(mapStateToProps({}))
        .toHaveProperty('status');
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchDataTypeReferenceStatus).toHaveBeenCalled();
    });
  });
});
