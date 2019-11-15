import { createSelector } from 'reselect';


export const getContentTypeState = state => state.contentType;
export const getContentTypeIdList = state => state.contentType.list;
export const getContentTypeMap = state => state.contentType.map;

export const getContentTypeList = createSelector(
  [getContentTypeMap, getContentTypeIdList],
  (contentTypeMap, idList) => idList.map(id => contentTypeMap[id]),
);
