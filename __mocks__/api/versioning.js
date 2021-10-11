import { mockApi } from 'test/testUtils';
import {
  LIST_VERSIONING_OK, LIST_SINGLE_VERSIONING_OK,
  CONTENT_DETAILS_OK, LIST_IMAGES_OK,
} from 'test/mocks/versioning';

// eslint-disable-next-line import/prefer-default-export
export const getVersionings = jest.fn(mockApi({ payload: LIST_VERSIONING_OK }));
export const getResourceVersionings = jest.fn(mockApi({ payload: LIST_IMAGES_OK }));
export const getSingleVersioning = jest.fn(mockApi({ payload: LIST_SINGLE_VERSIONING_OK }));
export const getContentDetails = jest.fn(mockApi({ payload: CONTENT_DETAILS_OK }));
