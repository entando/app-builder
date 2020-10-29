import apps from 'entando-apps';
import { get } from 'lodash';

import NavigationBarConfigFormContainer from 'ui/widgets/config/forms/NavigationBarConfigFormContainer';

const appsWidgetForms = apps.reduce((obj, app) => ({
  ...obj,
  ...app.widgetForms != null ? app.widgetForms : {},
}), {});

const appBuilderNativeWidgetForms = {
  navigatorConfig: NavigationBarConfigFormContainer,
};

const widgetForms = { ...appsWidgetForms, ...appBuilderNativeWidgetForms };

export default (widget, baseOnly) => {
  const { widgetCode, action, parentType } = widget || {};
  const widgetFormId = action || widgetCode || parentType;
  const widgetForm = widgetForms && widgetFormId ? widgetForms[widgetFormId] : null;
  const moduleKey = baseOnly ? 'body' : 'default';
  return get(widgetForm, moduleKey, widgetForm);
};
