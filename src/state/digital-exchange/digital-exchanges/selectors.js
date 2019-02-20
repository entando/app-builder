import { createSelector } from 'reselect';

export const getDigitalExchanges = state => state.digitalExchanges;

export const getDigitalExchangeList = createSelector(
  getDigitalExchanges,
  digitalExchanges => digitalExchanges.list,
);

export const getSelectedDigitalExchange = createSelector(
  [getDigitalExchanges],
  digitalExchanges => digitalExchanges.selected,
);
