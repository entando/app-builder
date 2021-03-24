// eslint-disable-next-line import/prefer-default-export
export const FILE_TREE_RESPONSE = [
  { id: 1, path: 'changelog.txt' },
  { id: 2, path: 'debug.js' },
  { id: 29, path: 'main.js' },
  { id: 3, path: 'license.txt' },
  { id: 4, path: 'package.json' },
  { id: 5, path: 'readme.md' },
  { id: 6, path: 'release.js' },
  { id: 7, path: 'controllers/api.js' },
  { id: 8, path: 'controllers/chat.js' },
  { id: 9, path: 'controllers/default.js' },
  { id: 10, path: 'databases/channels.json' },
  { id: 11, path: 'databases/users.json' },
  { id: 12, path: 'definitions/auth.js' },
  { id: 13, path: 'definitions/convertors.js' },
  { id: 14, path: 'definitions/globals.js' },
  { id: 15, path: 'definitions/helpers.js' },
  { id: 16, path: 'definitions/localization.js' },
  { id: 17, path: 'definitions/merge.js' },
  { id: 18, path: 'definitions/operations.js' },
  { id: 19, path: 'definitions/scheduler.js' },
  { id: 20, path: 'models/account.js' },
  { id: 21, path: 'models/channels.js' },
  { id: 22, path: 'models/favorites.js' },
  { id: 23, path: 'models/login.js' },
  { id: 24, path: 'models/messages.js' },
  { id: 25, path: 'models/tasks.js' },
  { id: 26, path: 'models/users.js' },
  { id: 27, path: 'public/favicon.ico' },
  { id: 28, path: 'public/icon.png' }];

export const GET_FILE_RESPONSE = {
  id: 54120558,
  path: 'main.js',
  _created: {
    at: '1953-01-13T12:47:32.242Z',
    by: 'cillum ',
  },
  _updated: {
    at: '1947-03-16T16:05:44.080Z',
    by: 'consectetur cillum pariatur eu',
  },
  content: `
  // The source (has been changed) is https://github.com/facebook/react/issues/5465#issuecomment-157888325

  const CANCELATION_MESSAGE = {
    type: 'cancelation',
    msg: 'operation is manually canceled',
  };

  function makeCancelable(promise) {
    let hasCanceled_ = false;

    const wrappedPromise = new Promise((resolve, reject) => {
      promise.then(val => hasCanceled_ ? reject(CANCELATION_MESSAGE) : resolve(val));
      promise.catch(reject);
    });

    return (wrappedPromise.cancel = () => (hasCanceled_ = true), wrappedPromise);
  }

  export default makeCancelable;
`,
};

export const RESPONSE_SUCCESS = {
  ok: 1,
};
