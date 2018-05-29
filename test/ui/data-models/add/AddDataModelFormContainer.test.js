import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/data-models/add/AddDataModelFormContainer';
import { DATA_TYPES_OK_PAGE_1 } from 'test/mocks/dataTypes';

const TEST_STATE = {
  dataTypes: {
    list: ['ABC', 'DEF'],
    map: {
      ABC: {
        name: 'dataType1',
        code: 'ABC',
        status: '0',
      },
      DEF: {
        name: 'dataType2',
        code: 'DEF',
        status: '0',
      },
    },
  },
};

describe('AddDataModelFormContainer', () => {
  it('maps dataTypes property state in DataModelForm', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({ dataTypes: DATA_TYPES_OK_PAGE_1.payload });
  });

  it('verify that onWillMount and onSubmit are defined and called in mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onSubmit).toBeDefined();
    result.onSubmit();
    expect(dispatchMock).toHaveBeenCalled();
    expect(result.onWillMount).toBeDefined();
    result.onWillMount();
    expect(dispatchMock).toHaveBeenCalled();
  });
});
