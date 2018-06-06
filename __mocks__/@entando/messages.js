const mock = jest.genMockFromModule('@entando/messages');
const real = require.requireActual('@entando/messages');

mock.messages = real.messages;
mock.addToast = real.addToast;
mock.getErrors = real.getErrors;
mock.clearErrors = real.clearErrors;
mock.addErrors = real.addErrors;
mock.ADD_TOAST = 'toasts/add-toast';
mock.CLEAR_ERRORS = 'errors/clear-errors';
mock.ADD_ERRORS = 'errors/add-errors';

jest.spyOn(mock, 'clearErrors');

export const {
  messages,
  addToast,
  removeToast,
  getToasts,
  clearErrors,
  addErrors,
  getErrors,
  ADD_TOAST,
  CLEAR_ERRORS,
  ADD_ERRORS,
  TOAST_ERROR,
  TOAST_SUCCESS,
} = mock;
