export const FORM_MODE_EDIT = 'fragment-form/edit';
export const FORM_MODE_ADD = 'fragment-form/add';
export const FORM_MODE_CLONE = 'fragment-form/clone';
export const REGULAR_SAVE_TYPE = 'fragments/save-type-regular';
export const CONTINUE_SAVE_TYPE = 'fragments/save-type-continue';
export const DEFAULT_FORM_VALUES = { code: '', guiCode: '', defaultGuiCode: '' };
export const DEFAULT_EDITED_FORM_VALUES = {
  ...DEFAULT_FORM_VALUES,
  widgetType: { code: null, title: null },
  pluginCode: null,
};
