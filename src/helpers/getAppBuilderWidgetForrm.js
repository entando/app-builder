import apps from 'entando-apps';

const widgetForms = apps.reduce((obj, app) => ({
  ...obj,
  ...app.widgetForms != null ? app.widgetForms : {},
}), {});

export default widgetCode => (widgetForms && widgetCode ? widgetForms[widgetCode] : null);
