// eslint-disable-next-line import/prefer-default-export
export const formatDate = (date) => {
  try {
    return (new Date(date)).toISOString().replace('T', ' ').split('.')[0];
  } catch (error) {
    return 'N/A';
  }
};
