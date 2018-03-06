export const toMap = (array, id) => array.reduce((acc, item) => {
  acc[item[id]] = item;
  return acc;
}, {});

export default toMap;
