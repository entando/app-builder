import apps from 'entando-apps';

import NavigationBarConfigFormContainer from 'ui/widgets/config/forms/NavigationBarConfigFormContainer';

const appsWidgetForms = apps.reduce((obj, app) => ({
  ...obj,
  ...app.widgetForms != null ? app.widgetForms : {},
}), {});

const appBuilderNativeWidgetForms = {
  navigatorConfig: NavigationBarConfigFormContainer,
};

const widgetForms = { ...appsWidgetForms, ...appBuilderNativeWidgetForms };

export default (widget) => {
  const { widgetCode, action } = widget || {};
  const widgetFormId = action || widgetCode;
  return widgetForms && widgetFormId ? widgetForms[widgetFormId] : null;
};
