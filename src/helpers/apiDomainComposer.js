const composeCMApiDomain = (context) => {
  let basePath = '/digital-exchange';
  if (process.env.DOMAIN_CM) basePath = process.env.DOMAIN_CM;
  if (!context) return basePath;
  return `${basePath}/${context}`;
};

// eslint-disable-next-line import/prefer-default-export
export { composeCMApiDomain };
