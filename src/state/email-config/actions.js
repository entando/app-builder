import { initialize } from 'redux-form';
import { addToast, addErrors, TOAST_ERROR, TOAST_SUCCESS } from '@entando/messages';

import {
  getSMTPServerSettings,
  putSMTPServerSettings,
  postTestEmailConfig,
  postSendTestEmail,
  getEmailSenders,
  deleteEmailSender as deleteEmailSenderRequest,
  postEmailSender,
  getEmailSender,
  putEmailSender,
} from 'api/emailConfig';
import { SET_EMAIL_SENDERS, REMOVE_EMAIL_SENDER, SET_SELECTED_SENDER } from 'state/email-config/types';
import { history, ROUTE_EMAIL_CONFIG_SENDERS } from 'app-init/router';

export const setEmailSenders = emailSenders => ({
  type: SET_EMAIL_SENDERS,
  payload: emailSenders,
});

export const removeEmailSender = code => ({
  type: REMOVE_EMAIL_SENDER,
  payload: code,
});

export const setSelectedSender = emailSender => ({
  type: SET_SELECTED_SENDER,
  payload: emailSender,
});

export const fetchSMTPServerSettings = () => async (dispatch) => {
  try {
    const response = await getSMTPServerSettings();
    const json = await response.json();
    if (response.ok) {
      const smtpServerSettings = json.payload;
      dispatch(initialize('emailConfig', smtpServerSettings));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    }
  } catch (e) {
    // do nothing
  }
};

export const saveEmailConfig = emailConfig => async (dispatch) => {
  try {
    const response = await putSMTPServerSettings(emailConfig);
    const json = await response.json();
    if (response.ok) {
      dispatch(initialize('emailConfig', emailConfig));
      dispatch(addToast({ id: 'emailConfig.saveSuccessful' }, TOAST_SUCCESS));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    }
  } catch (e) {
    // do nothing
  }
};

export const testEmailConfig = emailConfig => async (dispatch) => {
  try {
    const response = await postTestEmailConfig(emailConfig);
    const json = await response.json();
    if (response.ok) {
      dispatch(addToast({ id: 'emailConfig.valid' }, TOAST_SUCCESS));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    }
  } catch (e) {
    // do nothing
  }
};

export const sendTestEmail = () => async (dispatch) => {
  try {
    const response = await postSendTestEmail();
    const json = await response.json();
    if (response.ok) {
      dispatch(addToast({ id: 'emailConfig.sendTestSuccess' }, TOAST_SUCCESS));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    }
  } catch (e) {
    // do nothing
  }
};

export const fetchEmailSenders = () => async (dispatch) => {
  try {
    const response = await getEmailSenders();
    const json = await response.json();
    if (response.ok) {
      dispatch(setEmailSenders(json.payload));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    }
  } catch (e) {
    // do nothing
  }
};

export const deleteEmailSender = code => async (dispatch) => {
  try {
    const response = await deleteEmailSenderRequest(code);
    const json = await response.json();
    if (response.ok) {
      dispatch(removeEmailSender(code));
      dispatch(addToast({ id: 'app.deleted', values: { type: 'sender', code } }, TOAST_SUCCESS));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    }
  } catch (e) {
    // do nothing
  }
};

export const addEmailSender = sender => async (dispatch) => {
  try {
    const response = await postEmailSender(sender);
    const json = await response.json();
    if (response.ok) {
      history.push(ROUTE_EMAIL_CONFIG_SENDERS);
      dispatch(addToast({ id: 'app.created', values: { type: 'sender', code: sender.code } }, TOAST_SUCCESS));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    }
  } catch (e) {
    // do nothing
  }
};

export const fetchEmailSender = code => async (dispatch) => {
  try {
    const response = await getEmailSender(code);
    const json = await response.json();
    if (response.ok) {
      dispatch(setSelectedSender(json.payload));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    }
  } catch (e) {
    // do nothing
  }
};

export const updateEmailSender = sender => async (dispatch) => {
  try {
    const response = await putEmailSender(sender);
    const json = await response.json();
    if (response.ok) {
      history.push(ROUTE_EMAIL_CONFIG_SENDERS);
      dispatch(addToast({ id: 'app.updated', values: { type: 'sender', code: sender.code } }, TOAST_SUCCESS));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    }
  } catch (e) {
    // do nothing
  }
};
