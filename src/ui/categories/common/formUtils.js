import { convertToQueryString } from '@entando/utils';

export const activeLangQueryString = convertToQueryString({
  formValues: { isActive: true },
});
export const noPagination = { page: 1, pageSize: 0 };
