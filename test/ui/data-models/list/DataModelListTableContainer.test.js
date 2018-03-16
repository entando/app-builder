import 'test/enzyme-init';

import { mapDispatchToProps } from 'ui/data-models/list/DataModelListTableContainer';

describe('DataModelListPageContainer', () => {
  it('verify that onWillMount are defined and called in mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onWillMount).toBeDefined();
    result.onWillMount();
    expect(dispatchMock).toHaveBeenCalled();
  });
});
