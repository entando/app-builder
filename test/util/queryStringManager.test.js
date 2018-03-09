import 'test/enzyme-init';
import { convertToQueryString, addFilter, setSorting } from 'util/queryStringManager';

const object = {
  code: 'test_code',
  value: 'test',
  type: 'type',
};

const operators = {
  code: 'eq',
  value: 'eq',
  type: 'eq',
};

const filterValues = {
  attribute: 'code',
  value: 'test_code',
  operator: 'like',
  pos: 0,
};

const filters = {
  formValues: object,
  operators,
  sorting: {
    attribute: 'code',
    direction: 'ASC',
  },
};


const QUERY_STRING_OK = '?sort=code&direction=ASC&filters[0][attribute]=code&filters[0]' +
'[operator]=eq&filters[0][value]=test_code' +
'&filters[1][attribute]=value&filters[1][operator]=eq' +
'&filters[1][value]=test&filters[2][attribute]=type' +
'&filters[2][operator]=eq&filters[2][value]=type';
const FILTER_OK = 'filters[0][attribute]=code&filters[0]' +
'[operator]=like&filters[0][value]=test_code';
const SORTING_OK = 'sort=code&direction=ASC';


describe('test convertToQueryString', () => {
  it('test if properly convert object to query string', () => {
    const queryString = convertToQueryString(filters);
    expect(queryString).toEqual(QUERY_STRING_OK);
  });
  it('test if \'eq\' is the default operator', () => {
    const queryString = convertToQueryString({ formValues: filters.formValues });
    expect(queryString.includes('[operator]=eq')).toBe(true);
  });
});
describe('test addFilter', () => {
  it('test if properly generate attribute filters', () => {
    const filter = addFilter(filterValues);
    expect(filter).toEqual(FILTER_OK);
  });
});
describe('test setSorting', () => {
  it('test if properly generate a sort filter', () => {
    const filter = setSorting(filters.sorting);
    expect(filter.join('&')).toEqual(SORTING_OK);
  });
});
