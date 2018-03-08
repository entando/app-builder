import 'test/enzyme-init';
import { convertToQueryString, addFilter } from 'util/queryStringManager';

const object = {
  code: 'test_code',
  value: 'test',
  type: 'type',
};

const operator = 'like';
const filterValues = {
  attribute: 'code',
  value: 'test_code',
  operator,
  pos: 0,
};

const QUERY_STRING_OK = '?filters[0][attribute]=code&filters[0]' +
'[operator]=eq&filters[0][value]=test_code' +
'&filters[1][attribute]=value&filters[1][operator]=eq' +
'&filters[1][value]=test&filters[2][attribute]=type' +
'&filters[2][operator]=eq&filters[2][value]=type';
const FILTER_OK = 'filters[0][attribute]=code&filters[0]' +
'[operator]=like&filters[0][value]=test_code';


describe('test convertToQueryString', () => {
  it('test if properly convert object to query string', () => {
    const queryString = convertToQueryString(object);
    expect(queryString).toEqual(QUERY_STRING_OK);
  });
  it('test if \'eq\' is the default operator', () => {
    const queryString = convertToQueryString(object);
    expect(queryString.includes('[operator]=eq')).toBe(true);
  });
});
describe('test addFilter', () => {
  it('test if properly generate a queryString filter', () => {
    const filter = addFilter(filterValues);
    expect(filter).toEqual(FILTER_OK);
  });
});
