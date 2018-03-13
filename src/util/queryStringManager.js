
export const DEFAULT_FILTER_OPERATOR = 'eq';
export const FILTER_OPERATORS = {
  EQUAL: 'eq',
  GREATER_THAN: 'gt',
  LESS_THAN: 'lt',
  NOT: 'not',
  LIKE: 'like',
};
export const SORT_DIRECTIONS = {
  ASCENDANT: 'ASC',
  DESCENDANT: 'DESC',
};
export const DEFAULT_SORT_DIRECTION = 'ASC';

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
    `direction=${Object.values(SORT_DIRECTIONS).includes(sorting.direction) ?
      sorting.direction : DEFAULT_SORT_DIRECTION}`,
  ]
);

export const setFilters = (object = {}, operators = []) => {
  let filters = [];
  const properties = Object.keys(object);
  filters = properties.map((property, index) => {
    const filterValues = {
      attribute: property,
      value: object[property],
      operator: (property in operators) ? operators[property] : DEFAULT_FILTER_OPERATOR,
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
