export const WIDGET_WITH_CONFIG_FORM = {
  code: 'mock_widget',
  used: 2,
  titles: {
    it: 'Widget configurabile',
    en: 'Configurable widget',
  },
  typology: 'User Widget',
  guiFragments: [
    {
      code: 'fragCode',
      customUi: '<div></div>',
      defaultUi: '<div></div>',
    },
  ],
  pluginCode: 'plugin_code',
  group: 'group',
  config: {
    schema: {
      title: 'A registration form',
      description: 'A simple form example.',
      type: 'object',
      required: [
        'firstName',
        'lastName',
      ],
      properties: {
        firstName: {
          type: 'string',
          title: 'First name',
          default: 'Chuck',
        },
        lastName: {
          type: 'string',
          title: 'Last name',
        },
        age: {
          type: 'integer',
          title: 'Age',
        },
        bio: {
          type: 'string',
          title: 'Bio',
        },
        password: {
          type: 'string',
          title: 'Password',
          minLength: 3,
        },
        telephone: {
          type: 'string',
          title: 'Telephone',
          minLength: 10,
        },
      },
    },
    uiSchema: {
      firstName: {
        'ui:autofocus': true,
        'ui:emptyValue': '',
      },
      age: {
        'ui:widget': 'updown',
        'ui:title': 'Age of person',
        'ui:description': '(earthian year)',
      },
      bio: {
        'ui:widget': 'textarea',
      },
      password: {
        'ui:widget': 'password',
        'ui:help': 'Hint: Make it strong!',
      },
      date: {
        'ui:widget': 'alt-datetime',
      },
      telephone: {
        'ui:options': {
          inputType: 'tel',
        },
      },
    },
    formData: {
      firstName: 'Chuck',
      lastName: 'Norris',
      age: 75,
      bio: 'Roundhouse kicking asses since 1940',
      password: 'noneed',
    },
  },
};

export const WIDGET = {
  code: 'login_form',
  used: 2,
  titles: {
    it: 'Login',
    en: 'Login',
  },
  typology: 'User Widget',
  guiFragments: [
    {
      code: 'fragCode',
      customUi: '<div></div>',
      defaultUi: '<div></div>',
    },
  ],
  pluginCode: 'plugin_code',
  group: 'group',
};

export const WIDGET_LIST = {
  payload: [
    WIDGET_WITH_CONFIG_FORM,
    WIDGET,
    {
      ...WIDGET, code: 'search_form', titles: { it: 'Form di ricerca', en: 'Search Form' }, used: 3,
    },
    {
      ...WIDGET, code: 'single_content', typology: 'Custom Widget', titles: { it: 'Singolo Contenuto', en: 'Single Content' }, used: 4,
    },
    {
      ...WIDGET, code: 'content_viewer', titles: { it: 'Contenuti', en: 'Contents' }, used: 2,
    },
    {
      ...WIDGET,
      code: 'formAction',
      typology: 'Custom Widget',
      titles: { it: 'InternalServlet', en: 'InternalServlet' },
      used: 1,
      hasConfig: true,
    },
    {
      ...WIDGET,
      code: 'bpm-case-comments',
      typology: 'Entando Redhat BPM connector',
      titles: { it: 'BPM-Case comments', en: 'BPM-Case comments' },
      used: 1,
      hasConfig: true,
    },
    {
      ...WIDGET,
      code: 'bpm-case-progress-status',
      typology: 'Entando Redhat BPM connector',
      titles: { it: 'BPM-Case progress status', en: 'BPM-Case progress status' },
      used: 1,
      hasConfig: true,
    },
    {
      ...WIDGET,
      code: 'bpm-case-instance-selector',
      typology: 'Entando Redhat BPM connector',
      titles: { it: 'BPM-Case instance selector', en: 'BPM-Case instance selector' },
      used: 1,
      hasConfig: true,
    },
  ],
  errors: [],
  metaData: {
    page: 1,
    pageSize: 100,
    lastPage: 1,
    sort: 'code',
    direction: 'ASC',
    filters: [
      {
        attribute: 'code',
        operator: 'eq',
        value: '%D%',
      },
    ],
  },
};

export const LIST = WIDGET_LIST.payload.map(item => item.code);
export const WIDGETS_MAP = WIDGET_LIST.payload.reduce((acc, widget) => {
  acc[widget.code] = widget;
  return acc;
}, {});

export const WIDGET_ONE_LIST = {
  'User Widget': [WIDGET],
};

export const WIDGET_INFO = {
  code: 'row_content_viewer_list',
  titles: {
    en: 'En title',
    it: 'It title',
  },
  publishedUtilizers: [
    {
      frameIndex: 0,
      pageCode: 'sub_page2',
      pageFullPath: 'homepage/service/sub_page/sub_page2',
      frame: 'Sample Frame',
    },
  ],
  draftUtilizers: [
    {
      frameIndex: 0,
      pageCode: 'sub_page2',
      pageFullPath: 'homepage/service/sub_page/sub_page2',
      frame: 'Sample Frame',
    },
  ],
};
