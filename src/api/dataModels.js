import { DATAMODELTABLEROW } from 'test/mocks/dataModelList';

// eslint-disable-next-line
export const getApiDataModelList = () => (
  new Promise((resolve) => {
    resolve(DATAMODELTABLEROW);
  })
);
