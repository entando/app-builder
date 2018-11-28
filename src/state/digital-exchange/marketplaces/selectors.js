import { createSelector } from 'reselect';

export const getDEMarketplaces = state => state.digitalExchangeMarketplaces;

export const getDEMarketplaceList = createSelector(
  getDEMarketplaces,
  digitalExchangeMarketplaces => digitalExchangeMarketplaces.list,
);

export const getDEMarketplaceSelected = createSelector(
  [getDEMarketplaces],
  digitalExchangeMarketplace => digitalExchangeMarketplace.selected,
);
