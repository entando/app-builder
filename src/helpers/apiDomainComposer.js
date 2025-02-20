const composeApiDomain = (basePath, context) => {
  console.log('context in composeApiDomain', context);
  if (!context) return basePath;
  return `${basePath}/${context}`;
};

// eslint-disable-next-line import/prefer-default-export
export { composeApiDomain };
