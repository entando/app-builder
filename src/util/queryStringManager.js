
export const DEFAULT_FILTER_OPERATOR = 'eq';
export const FILTER_OPERATORS = ['eq', 'gt', 'lt', 'not', 'like'];
export const DEFAULT_SORT_DIRECTION = ['ASC'];

export const addFilter = (filterValues) => {
  const {
    attribute, pos, operator, value,
  } = filterValues;
  const filter = [
    `filters[${pos}][attribute]=${attribute}`,
    `filters[${pos}][operator]=${operator}`,
    `filters[${pos}][value]=${value}`,
  ];

  return filter.join('&');
};

export const setSorting = sorting => (
  [
    `sort=${sorting.attribute}`,
    `direction=${sorting.direction ? sorting.direction : DEFAULT_SORT_DIRECTION}`,
  ]
);

export const setFilters = (object, operators = []) => {
  const properties = Object.keys(object);
  const filters = properties.map((property, index) => {
    const filterValues = {
      attribute: property,
      value: object[property],
      operator: operators[property] ? operators[property] : DEFAULT_FILTER_OPERATOR,
      pos: index,
    };
    return addFilter(filterValues);
  });

  return filters;
};

export const convertToQueryString = (filters) => {
  const sorting = filters.sorting ? setSorting(filters.sorting) : [];
  const queryString = [...sorting, ...setFilters(filters.formValues, filters.operators)];
  return `?${queryString.join('&')}`;
};

export default convertToQueryString;
