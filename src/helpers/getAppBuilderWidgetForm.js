import apps from 'entando-apps';
import { get } from 'lodash';

import NavigationBarConfigFormContainer from 'ui/widgets/config/forms/NavigationBarConfigFormContainer';
import SimpleWidgetConfigFormContainer from 'ui/widgets/config/forms/SimpleWidgetConfigFormContainer';

const appsWidgetForms = apps.reduce((obj, app) => ({
  ...obj,
  ...app.widgetForms != null ? app.widgetForms : {},
}), {});

const appBuilderNativeWidgetForms = {
  navigatorConfig: NavigationBarConfigFormContainer,
  configSimpleParameter: SimpleWidgetConfigFormContainer,
};

const widgetForms = { ...appsWidgetForms, ...appBuilderNativeWidgetForms };

export default (widget, baseOnly) => {
  const { code, action } = widget || {};
  const widgetFormId = action || code;
  const widgetForm = widgetForms && widgetFormId ? widgetForms[widgetFormId] : null;
  const moduleKey = baseOnly ? 'body' : 'default';
  return get(widgetForm, moduleKey, widgetForm);
};
