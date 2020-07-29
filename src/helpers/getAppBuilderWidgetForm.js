import apps from 'entando-apps';

import NavigationBarConfigFormContainer from 'ui/widgets/config/forms/NavigationBarConfigFormContainer';

const appsWidgetForms = apps.reduce((obj, app) => ({
  ...obj,
  ...app.widgetForms != null ? app.widgetForms : {},
}), {});

const appBuilderNativeWidgetForms = {
  'entando-widget-navigation_menu': NavigationBarConfigFormContainer,
};

const widgetForms = { ...appsWidgetForms, ...appBuilderNativeWidgetForms };

export default widgetCode => (widgetForms && widgetCode ? widgetForms[widgetCode] : null);
