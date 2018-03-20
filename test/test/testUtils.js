
// eslint-disable-next-line import/prefer-default-export
export const errorResponse = (...messages) => ({
  errors: messages.map((message, code) => ({ code, message })),
});
