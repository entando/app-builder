import { createMockHistory } from 'test/legacyTestUtils';

import {
  mapStateToProps,
  mapDispatchToProps,
} from 'ui/content-type/ContentTypeReferenceStatusContainer';
import { fetchContentTypeReferenceStatus } from 'state/content-type/actions';

jest.mock('state/content-type/selectors', () => ({
  getContentTypeReferencesStatus: jest.fn(),
}));

jest.mock('state/content-type/actions', () => ({
  fetchContentTypeReferenceStatus: jest.fn(),
  sendPostContentTypeReferenceStatus: jest.fn(),
}));

const dispatchMock = jest.fn();

describe('ui/content-type/ContentTypeReferenceStatusContainer', () => {
  describe('mapStateToProps', () => {
    it('maps info property from state', () => {
      expect(mapStateToProps({})).toHaveProperty('status');
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    const history = createMockHistory();
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock, { history });
    });

    it('should map the correct function properties', () => {
      expect(props.onDidMount).toBeDefined();
      expect(props.onReload).toBeDefined();
    });

    it('should dispatch an action if onDidMount is called', () => {
      props.onDidMount({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchContentTypeReferenceStatus).toHaveBeenCalled();
    });
  });
});
