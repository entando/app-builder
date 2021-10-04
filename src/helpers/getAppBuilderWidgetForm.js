import apps from 'entando-apps';
import { get } from 'lodash';

import NavigationBarConfigFormContainer from 'ui/widgets/config/forms/NavigationBarConfigFormContainer';
import SimpleWidgetConfigFormContainer from 'ui/widgets/config/forms/SimpleWidgetConfigFormContainer';
import SingleContentConfigContainer, { formBody as SingleContentConfigBody } from 'ui/widget-forms/publish-single-content-config/SingleContentConfigContainer';
import MultipleContentsConfigContainer, { formBody as MultipleContentsConfigBody } from 'ui/widget-forms/MultipleContentsConfigContainer';
import ContentsQueryConfigContainer, { formBody as ContentsQueryFormBody } from 'ui/widget-forms/ContentsQueryConfigContainer';

const appsWidgetForms = apps.reduce((obj, app) => ({
  ...obj,
  ...app.widgetForms != null ? app.widgetForms : {},
}), {});

const appBuilderNativeWidgetForms = {
  navigatorConfig: NavigationBarConfigFormContainer,
  configSimpleParameter: SimpleWidgetConfigFormContainer,
};

const cmsWidgetForms = {
  viewerConfig: {
    default: SingleContentConfigContainer,
    body: SingleContentConfigBody,
  },
  listViewerConfig: {
    default: ContentsQueryConfigContainer,
    body: ContentsQueryFormBody,
  },
  rowListViewerConfig: {
    default: MultipleContentsConfigContainer,
    body: MultipleContentsConfigBody,
  },
};

const widgetForms = {
  ...appsWidgetForms,
  ...appBuilderNativeWidgetForms,
  ...cmsWidgetForms,
};

export default (widget, baseOnly) => {
  const { code, action } = widget || {};
  const widgetFormId = action || code;
  const widgetForm = widgetForms && widgetFormId ? widgetForms[widgetFormId] : null;
  const moduleKey = baseOnly ? 'body' : 'default';
  return get(widgetForm, moduleKey, widgetForm);
};
