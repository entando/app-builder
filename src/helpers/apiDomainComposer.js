import getRuntimeEnv from 'helpers/getRuntimeEnv';


const composeCMApiDomain = (context) => {
  let basePath = '/digital-exchange';
  const { DOMAIN_CM } = getRuntimeEnv();
  if (DOMAIN_CM) basePath = DOMAIN_CM;
  if (!context) return basePath;
  return `${basePath}/${context}`;
};

// eslint-disable-next-line import/prefer-default-export
export { composeCMApiDomain };
