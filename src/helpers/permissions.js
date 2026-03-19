/**
 * Evaluates a boolean permission expression against user permissions.
 * Supports & (AND), | (OR), and parentheses for grouping.
 * Example: "(editContents|validateContents)&superuser"
 */
// eslint-disable-next-line import/prefer-default-export
export const checkPermission = (expr, userPermissions) => {
  if (!expr) return false;
  let i = 0;

  const parseOr = () => {
    // eslint-disable-next-line no-use-before-define
    let result = parseAnd();
    // eslint-disable-next-line no-plusplus,no-use-before-define
    while (expr[i] === '|') { i++; result = parseAnd() || result; }
    return result;
  };

  const parseAnd = () => {
    // eslint-disable-next-line no-use-before-define
    let result = parseAtom();
    // eslint-disable-next-line no-plusplus,no-use-before-define
    while (expr[i] === '&') { i++; result = parseAtom() && result; }
    return result;
  };

  const parseAtom = () => {
    if (expr[i] === '(') {
      // eslint-disable-next-line no-plusplus
      i++;
      const result = parseOr();
      // eslint-disable-next-line no-plusplus
      i++;
      return result;
    }
    let name = '';
    // eslint-disable-next-line no-plusplus
    while (i < expr.length && /\w/.test(expr[i])) name += expr[i++];
    return userPermissions.includes(name);
  };

  return parseOr();
};
