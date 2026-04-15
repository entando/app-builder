import getAppBuilderWidgetForm from 'helpers/getAppBuilderWidgetForm';
import { adminConsoleUrl } from 'helpers/urlUtils';
import { hasFeatureFlag, FEATURE_FLAG_HEADLESS_WIDGET_CONFIG } from 'helpers/featureFlags';

export const LEGACY_CONFIG_CUSTOM_ELEMENT = 'LEGACY_CONFIG';

// A widget is "legacy" when its configUi.customElement is set to LEGACY_CONFIG
// and it has no internal app-builder form registered in getAppBuilderWidgetForm.
// Gated behind the HEADLESS_WIDGET_CONFIG feature flag.
export const isLegacyWidget = (widget) => {
  if (!hasFeatureFlag(FEATURE_FLAG_HEADLESS_WIDGET_CONFIG)) {
    return false;
  }
  if (!widget || !widget.configUi || widget.configUi.customElement !== 'LEGACY_CONFIG') {
    return false;
  }
  return !getAppBuilderWidgetForm(widget);
};

export const buildLegacyConfigUrl = (widget, pageCode, frameId) => {
  const actionConf = widget.configUiName || 'configSimpleParameter';
  const path =
      `do/Page/SpecialWidget/${actionConf}?pageCode=${pageCode}&widgetTypeCode=${widget.code}&frame=${frameId}&entandoHeadless=true`;
  return adminConsoleUrl(path);
};
