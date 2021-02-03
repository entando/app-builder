import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line import/prefer-default-export
export const generateRandomId = () => uuidv4().replaceAll('-', '_').substr(0, 10);
