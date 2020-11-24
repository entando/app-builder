
export const returnedFuncMock = jest.fn();

export const reduxForm = () => () => () => 'span';
export const reducer = () => ({});
export const formValueSelector = jest.fn().mockReturnValue(returnedFuncMock);

export const Field = () => () => 'span';
Field.displayName = 'Field';

export const FieldArray = () => () => 'span';
FieldArray.displayName = 'FieldArray';

export const FormSection = () => () => 'span';
FormSection.displayName = 'FormSection';


// action creators
export const blur = jest.fn().mockReturnValue({ type: '@@redux-form/BLUR' });
export const change = jest.fn().mockReturnValue({ type: '@@redux-form/CHANGE' });
export const destroy = jest.fn().mockReturnValue({ type: '@@redux-form/DeSTROY' });
export const focus = jest.fn().mockReturnValue({ type: '@@redux-form/FOCUS' });
export const reset = jest.fn().mockReturnValue({ type: '@@redux-form/RESET' });
export const startAsyncValidation = jest.fn().mockReturnValue({ type: '@@redux-form/START_AV' });
export const startSubmit = jest.fn().mockReturnValue({ type: '@@redux-form/START_SUBMIT' });
export const stopSubmit = jest.fn().mockReturnValue({ type: '@@redux-form/STOP_SUBMIT' });
export const stopAsyncValidation = jest.fn().mockReturnValue({ type: '@@redux-form/STOP_AV' });
export const touch = jest.fn().mockReturnValue({ type: '@@redux-form/TOUCH' });
export const untouch = jest.fn().mockReturnValue({ type: '@@redux-form/UNTOUCH' });
export const clearFields = jest.fn().mockReturnValue({ type: '@@redux-form/CLEAR_FIELDS' });

export const initialize = jest.fn().mockImplementation((form, data) => ({
  type: '@@redux-form/INITIALIZE',
  payload: data,
  meta: { form },
}));

// selectors
export const getFormValues = jest.fn(form => () => ({ form }));
export const valueSelector = jest.fn();
export const isSubmitting = jest.fn(form => () => ({ form }));
export const isInvalid = jest.fn(form => () => ({ form }));
