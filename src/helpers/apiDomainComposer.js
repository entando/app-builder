const composeCMApiDomain = (context) => {
  const domainCM = process.env.DOMAIN_CM;
  let basePath;
  if (!domainCM) basePath = '/digital-exchange';
  else basePath = domainCM;
  if (!context) return basePath;
  return `${basePath}/${context}`;
};

// eslint-disable-next-line import/prefer-default-export
export { composeCMApiDomain };
