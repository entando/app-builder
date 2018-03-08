const addFilter = (name, value, pos) => {
  const filter = [
    `filters[${pos}][attribute]=${name}`,
    `filters[${pos}][operator]=eq`,
    `filters[${pos}][value]=${value}`,
  ];

  return filter.join('&');
};

export const convertToQueryString = (object) => {
  const properties = Object.keys(object);
  const queryString = properties.map((property, index) => (
    addFilter(property, object[property], index)
  ));

  return `?${queryString.join('&')}`;
};

export default convertToQueryString;
