export const GET_CURRENT_TENANT_RESPONSE_OK_NON_PRIMARY = {
  primary: false,
  code: '<TENANT_CODE>',
  resourceRootUrl: 'https://cds-mt720.k8s-entando.org/primary/public',
  resourceRootPath: '/entando-de-app/cmsresources/',
};

export const GET_CURRENT_TENANT_RESPONSE_OK_PRIMARY = {
  primary: true,
  code: '<TENANT_CODE>',
  resourceRootUrl: null,
  resourceRootPath: '/entando-de-app/cmsresources/',
};
