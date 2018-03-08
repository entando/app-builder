// eslint-disable-next-line import/prefer-default-export
export const isInteger = attribute => (
  !Number.isNaN(parseFloat(attribute)) && Number.isInteger(parseFloat(attribute))
);
