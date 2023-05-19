// eslint-disable-next-line import/prefer-default-export
export const selectCurrentTenant = state => state.currentTenant.currentTenant;
export const selectIsPrimaryTenant = state =>
  (state.currentTenant.currentTenant ? state.currentTenant.currentTenant.primary :
    // if we are in single tenant mode, we set tenant value as "null" and we need to return "true"
    state.currentTenant.currentTenant === null);
