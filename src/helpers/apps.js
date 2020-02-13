import apps from 'entando-apps';

const widgetForms = apps.reduce((obj, app) => ({
  ...obj,
  ...app.widgetForms != null ? app.widgetForms : {},
}), {});

export const getAppBuilderWidgetForm = widgetCode =>
  (widgetForms && widgetCode ? widgetForms[widgetCode] : null);

export const isAppBuilderAppWidgetForm = widgetCode =>
  (widgetForms && widgetCode ? Object.keys(widgetForms).includes(widgetCode) : false);
