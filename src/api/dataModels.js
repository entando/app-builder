import { DATAMODELTABLEROW } from 'test/mocks/dataModelList';

// eslint-disable-next-line
export const getDataModels = () => (
  new Promise((resolve) => {
    resolve(DATAMODELTABLEROW);
  })
);
