export const TYPE_BOOLEAN = 'Boolean';
export const TYPE_CHECKBOX = 'CheckBox';
export const TYPE_DATE = 'Date';
export const TYPE_ENUMERATOR = 'Enumerator';
export const TYPE_ENUMERATOR_MAP = 'EnumeratorMap';
export const TYPE_COMPOSITE = 'Composite';
export const TYPE_LIST = 'List';
export const TYPE_MONOLIST = 'Monolist';
export const TYPE_NUMBER = 'Number';
export const TYPE_THREESTATE = 'ThreeState';
export const TYPE_TIMESTAMP = 'Timestamp';
export const TYPE_HYPERTEXT = 'Hypertext';
export const TYPE_LONGTEXT = 'Longtext';
export const TYPE_TEXT = 'Text';
export const TYPE_ATTACH = 'Attach';
export const TYPE_IMAGE = 'Image';
export const TYPE_LINK = 'Link';
export const TYPE_MONOTEXT = 'Monotext';
export const TYPE_EMAIL = 'Email';

export const MODE_ADD = 'add';
export const MODE_EDIT = 'edit';
export const MODE_EDIT_COMPOSITE = 'editComposite';
export const MODE_ADD_COMPOSITE = 'addComposite';
export const MODE_ADD_ATTRIBUTE_COMPOSITE = 'addAttributeComposite';
export const MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE = 'addMonolistAttributeComposite';
export const MODE_ADD_SUB_ATTRIBUTE_MONOLIST_COMPOSITE = 'addSubAttributeMonolistComposite';

export const TYPE_TEXT_METHODS = ['getTextForLang("<LANG_CODE>")', 'text', 'textMap("<LANG_CODE>")'];
export const TYPE_NUMBER_METHODS = ['number', 'value'];
export const TYPE_HYPERTEXT_METHODS = [
  'getHead(<VALUE>)',
  'getHeadEscaped(VALUE)',
  'getTextAfterImage(<PERCENT_VALUE>)',
  'getTextBeforeImage(<PERCENT_VALUE>)',
  'getTextByRange(<START_PERCENT_VALUE>, <END_PERCENT_VALUE>)',
  'getTextForLang("<LANG_CODE>")',
  'text',
  'textMap("<LANG_CODE>")',
];
export const TYPE_DATE_METHODS = [
  'fullDate',
  'getFormattedDate("<DATE_PATTERN>")',
  'longDate',
  'mediumDate',
  'shortDate',
];
export const TYPE_ENUMERATOR_METHODS = ['text'];
export const TYPE_ENUMERATOR_MAP_METHODS = ['mapKey', 'mapValue'];
export const TYPE_BOOLEAN_METHODS = ['booleanValue', 'value'];
export const TYPE_COMPOSITE_METHODS = ['get("<ATTRIBUTE_NAME>")', 'size()'];
export const TYPE_LIST_METHODS = ['get(<INDEX>)', 'size()'];
export const TYPE_IMAGE_METHODS = [
  'getImagePath(<SIZE_ID>)',
  'getMetadata("<METADATA_CODE>")',
  'getMetadataForLang("<METADATA_CODE>", "<LANG_CODE>")',
  'getResource("<LANG_CODE>")',
  'getResourceAltForLang("<LANG_CODE>")',
  'getResourceDescriptionForLang("<LANG_CODE>")',
  'getResourceLegendForLang("<LANG_CODE>")',
  'getResourceTitleForLang("<LANG_CODE>")',
  'getTextForLang("<LANG_CODE>")',
  'resource',
  'resourceAlt',
  'resourceAltMap["<LANG_CODE>"]',
  'resourceDescription',
  'resourceDescriptionMap["<LANG_CODE>"]',
  'resourceLegend',
  'resourceLegendMap["<LANG_CODE>"]',
  'resourceTitle',
  'resourceTitleMap["<LANG_CODE>"]',
  'text',
  'textMap["<LANG_CODE>"]',
];
export const TYPE_LINK_METHODS = [
  'destination',
  'getTextForLang("<LANG_CODE>")',
  'symbolicLink',
  'text',
  'textMap["<LANG_CODE>"]',
];
