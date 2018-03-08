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

export const convertToQueryString = (object, operator = 'eq') => {
  const properties = Object.keys(object);
  const queryString = properties.map((property, index) => {
    const filterValues = {
      attribute: property,
      value: object[property],
      operator,
      pos: index,
    };
    return addFilter(filterValues);
  });

  return `?${queryString.join('&')}`;
};

export default convertToQueryString;
