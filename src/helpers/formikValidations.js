// eslint-disable-next-line import/prefer-default-export
export const validateJson = (value, yupProps) => {
  const { createError, path } = yupProps;
  try {
    JSON.parse(value);
    return true;
  } catch (e) {
    return createError({
      message: `Invalid JSON format: ${e.message}`,
      path,
    });
  }
};
