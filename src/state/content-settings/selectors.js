import { createSelector } from 'reselect';
import { reduce } from 'lodash';

export const getSettingsState = state => state.apps.cms.contentSettings;

export const getIndexesStatus = createSelector(
  getSettingsState,
  settings => settings.indexesStatus,
);

export const getReferencesStatus = createSelector(
  getSettingsState,
  settings => settings.referencesStatus,
);

export const getIndexesLastReload = createSelector(
  getSettingsState,
  settings => settings.indexesLastReload,
);

export const getEditorSettings = createSelector(
  getSettingsState,
  settings => settings.editor,
);

export const getCropRatios = createSelector(
  getSettingsState,
  settings => settings.cropRatios,
);

export const getMetadataMapping = createSelector(
  getSettingsState,
  settings => settings.metadata || {},
);

export const getMetadataMappingList = createSelector(
  getMetadataMapping,
  metadatas => Object.entries(metadatas).map(([key, metadata]) => ({
    key,
    metadata,
  })),
);

export const getMetadataMappingFormData = createSelector(
  getMetadataMapping,
  metadatas => reduce(
    metadatas,
    (acc, value, key) => {
      acc[key] = value.join(',');
      return acc;
    },
    {},
  ),
);
