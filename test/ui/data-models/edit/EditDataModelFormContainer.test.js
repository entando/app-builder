import { mapStateToProps, mapDispatchToProps } from 'ui/data-models/edit/EditDataModelFormContainer';
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

const ownProps = {
  match: {
    params: {
      dataModelId: 1,
    },
  },
};

describe('EditDataModelFormContainer', () => {
  it('maps dataTypes and dataModelId state in DataModelForm', () => {
    const state = mapStateToProps(TEST_STATE, ownProps);
    expect(state).toHaveProperty('dataTypes', DATA_TYPES_OK_PAGE_1.payload);
    expect(state).toHaveProperty('dataModelId', 1);
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
