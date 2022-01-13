import { get } from 'lodash';
// eslint-disable-next-line import/prefer-default-export
export const adminConsoleUrl = url => `${get(process.env, 'DOMAIN', '')}/${url}`;
