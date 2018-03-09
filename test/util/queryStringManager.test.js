import 'test/enzyme-init';
import {
  convertToQueryString, addFilter, setSorting, setFilters,
  FILTER_OPERATORS, SORT_DIRECTIONS,
} from 'util/queryStringManager';

const object = {
  code: 'test_code',
  value: 'test',
  type: 'type',
};

const operators = {
  code: FILTER_OPERATORS.EQUAL,
  value: FILTER_OPERATORS.EQUAL,
  type: FILTER_OPERATORS.EQUAL,
};

const filterValues = {
  attribute: 'code',
  value: 'test_code',
  operator: FILTER_OPERATORS.LIKE,
  pos: 0,
};

const filters = {
  formValues: object,
  operators,
  sorting: {
    attribute: 'code',
  },
};

const SORTING_OK = 'sort=code&direction=ASC';
const FILTER_OK = 'filters[0][attribute]=code&filters[0]' +
'[operator]=like&filters[0][value]=test_code';
const FILTERS_OK = 'filters[0][attribute]=code&filters[0]' +
'[operator]=eq&filters[0][value]=test_code' +
'&filters[1][attribute]=value&filters[1][operator]=eq' +
'&filters[1][value]=test&filters[2][attribute]=type' +
'&filters[2][operator]=eq&filters[2][value]=type';
const QUERY_STRING_OK = `?${SORTING_OK}&${FILTERS_OK}`;

describe('test convertToQueryString', () => {
  it('test if properly convert object to query string', () => {
    const queryString = convertToQueryString(filters);
    expect(queryString).toEqual(QUERY_STRING_OK);
  });
  it('test if \'eq\' is the default operator', () => {
    const queryString = convertToQueryString({ formValues: filters.formValues });
    expect(queryString.includes('[operator]=eq')).toBe(true);
  });
  it('test with empty object', () => {
    const queryString = convertToQueryString({});
    expect(queryString).toEqual('?');
  });
});
describe('test addFilter', () => {
  it('test if properly generate attribute filters', () => {
    const filter = addFilter(filterValues);
    expect(filter).toEqual(FILTER_OK);
  });
});
describe('test setFilters', () => {
  it('test if properly generate filters array', () => {
    const filterArray = setFilters(object, operators);
    expect(filterArray.join('&')).toEqual(FILTERS_OK);
  });
  it('test if manage bad input values correctly', () => {
    const filterArray = setFilters();
    expect(filterArray.join('&')).toEqual('');
  });
});
describe('test setSorting', () => {
  it('test if properly generate a sort filter', () => {
    const filter = setSorting(filters.sorting);
    expect(filter.join('&')).toEqual(SORTING_OK);
  });
  it('test default sorting direction with correct direction', () => {
    const filter = setSorting({
      attribute: 'code',
      direction: SORT_DIRECTIONS.ASCENDANT,
    });
    expect(filter.join('&')).toEqual(SORTING_OK);
  });
  it('test bad sorting object', () => {
    const filter = setSorting({ attribute: 'willfail' });
    expect(filter.join('&')).not.toEqual(SORTING_OK);
  });
  it('test default sorting direction with bad direction input', () => {
    const filter = setSorting({
      attribute: 'code',
      direction: 'XXX',
    });
    expect(filter.join('&')).toEqual(SORTING_OK);
  });
});
