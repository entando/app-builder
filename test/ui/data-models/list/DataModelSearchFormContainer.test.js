import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/data-models/list/DataModelSearchFormContainer';
import { DATA_TYPES } from 'test/mocks/dataTypes';

const TEST_STATE = {
  dataTypes: {
    list: DATA_TYPES.payload,
  },

};

describe('DataModelSearchFormContainer', () => {
  it('maps dataTypes property state in DataModelForm', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({ dataTypes: DATA_TYPES.payload });
  });

  it('verify that onWillMount and handleSubmit are defined and called in mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onWillMount).toBeDefined();
    expect(result.handleSubmit).toBeDefined();
    result.onWillMount();
    expect(dispatchMock).toHaveBeenCalled();
    result.handleSubmit();
    expect(dispatchMock).toHaveBeenCalled();
  });
});
