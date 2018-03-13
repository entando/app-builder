import reducer from 'state/data-types/reducer';
import { setDataTypes } from 'state/data-types/actions';
import { getDataTypeList } from 'state/data-types/selectors';
import { DATA_TYPES_OK_PAGE_1 } from 'test/mocks/dataTypes';

jest.mock('state/data-types/selectors', () => ({
  getDataTypeList: jest.fn(),
}));

const dataTypes = [
  {
    name: 'dataType1',
    code: 'ABC',
    status: 'ok',
  },
  {
    name: 'dataType2',
    code: 'DEF',
    status: 'ok',
  },
];

getDataTypeList.mockReturnValue(dataTypes);

describe('state/data-types/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action SET_DATA_TYPES', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setDataTypes(DATA_TYPES_OK_PAGE_1.payload));
    });

    it('should define the dataType payload', () => {
      expect(getDataTypeList(newState)).toEqual(DATA_TYPES_OK_PAGE_1.payload);
    });
  });
});
