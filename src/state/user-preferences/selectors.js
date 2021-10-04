import { createSelector } from 'reselect';

export const getUserPreferences = state => state.userPreferences || {};

export const getTranslationWarning = (
  createSelector([getUserPreferences], preferences => !!preferences.translationWarning)
);
