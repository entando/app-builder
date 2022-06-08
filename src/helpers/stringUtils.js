// eslint-disable-next-line import/prefer-default-export
export const convertPageTemplateConfigObjectToString = (pageTemplate) => {
  if (!pageTemplate || !pageTemplate.configuration) return null;
  if (pageTemplate.configuration instanceof Object) {
    return JSON.stringify(pageTemplate.configuration, null, 2);
  }
  return pageTemplate.configuration;
};
