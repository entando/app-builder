import { makeRequest, METHODS } from '@entando/apimanager';
import {
  CONTENT_SETTINGS_OK,
  CONTENT_SETTINGS_REFRESH_OK,
  CONTENT_SETTINGS_EDITOR_OK,
  CONTENT_SETTINGS_CROP_RATIOS_OK,
  CONTENT_SETTINGS_METADATA_OK,
} from 'test/mocks/contentSettings';

const settingsPath = '/api/plugins/cms/contentSettings';

export const getContentSettings = () => makeRequest({
  uri: settingsPath,
  method: METHODS.GET,
  mockResponse: CONTENT_SETTINGS_OK,
  useAuthentication: true,
});

export const postReloadIndexes = () => makeRequest({
  uri: `${settingsPath}/reloadIndexes`,
  method: METHODS.POST,
  body: {},
  mockResponse: CONTENT_SETTINGS_REFRESH_OK,
  useAuthentication: true,
});

export const postReloadReferences = () => makeRequest({
  uri: `${settingsPath}/reloadReferences`,
  method: METHODS.POST,
  body: {},
  mockResponse: CONTENT_SETTINGS_REFRESH_OK,
  useAuthentication: true,
});

export const putEditorSettings = editorObject => makeRequest({
  uri: `${settingsPath}/editor`,
  body: editorObject,
  method: METHODS.PUT,
  mockResponse: CONTENT_SETTINGS_EDITOR_OK,
  useAuthentication: true,
});

export const postCropRatio = cropRatio => makeRequest({
  uri: `${settingsPath}/cropRatios`,
  body: { ratio: cropRatio },
  method: METHODS.POST,
  mockResponse: CONTENT_SETTINGS_CROP_RATIOS_OK,
  useAuthentication: true,
});

export const postMetadataMap = metadata => makeRequest({
  uri: `${settingsPath}/metadata`,
  body: metadata,
  method: METHODS.POST,
  mockResponse: CONTENT_SETTINGS_METADATA_OK,
  useAuthentication: true,
});

export const deleteCropRatio = cropRatio => makeRequest({
  uri: `${settingsPath}/cropRatios/${cropRatio}`,
  method: METHODS.DELETE,
  mockResponse: CONTENT_SETTINGS_CROP_RATIOS_OK,
  useAuthentication: true,
});

export const putMetadataMap = (key, mapping) => makeRequest({
  uri: `${settingsPath}/metadata/${key}`,
  body: { mapping },
  method: METHODS.PUT,
  mockResponse: CONTENT_SETTINGS_METADATA_OK,
  useAuthentication: true,
});

export const putCropRatio = (cropRatio, newValue) => makeRequest({
  uri: `${settingsPath}/cropRatios/${cropRatio}`,
  method: METHODS.PUT,
  body: { ratio: newValue },
  mockResponse: CONTENT_SETTINGS_CROP_RATIOS_OK,
  useAuthentication: true,
});

export const deleteMetadataMap = metakey => makeRequest({
  uri: `${settingsPath}/metadata/${metakey}`,
  method: METHODS.DELETE,
  mockResponse: CONTENT_SETTINGS_METADATA_OK,
  useAuthentication: true,
});
