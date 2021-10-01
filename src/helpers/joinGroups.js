// WORKAROUND because joinGroups can be string. We should investigate why.
// eslint-disable-next-line import/prefer-default-export
export const parseJoinGroups = (joinGroups) => {
  if (Array.isArray(joinGroups)) {
    return joinGroups;
  }
  const isString = typeof joinGroups === 'string' || joinGroups instanceof String;
  let parsedJoinGroups = [];
  if (isString) {
    try {
      parsedJoinGroups = JSON.parse(joinGroups);
    } catch (err) {
      console.warn('Problem parsing join groups string: ', err);
    }
  }
  return parsedJoinGroups;
};
