import { redhatImg } from 'test/mocks/component-repository/componentImages';
import {
  ECR_COMPONENT_INSTALLATION_STATUS_CREATED,
  ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
  ECR_COMPONENT_INSTALLATION_STATUS_COMPLETED,
  ECR_COMPONENT_INSTALLATION_STATUS_ERROR,
  ECR_COMPONENT_UNINSTALLATION_STATUS_CREATED,
  ECR_COMPONENT_UNINSTALLATION_STATUS_IN_PROGRESS,
  ECR_COMPONENT_UNINSTALLATION_STATUS_ERROR,
  ECR_COMPONENT_UNINSTALLATION_STATUS_COMPLETED,
} from 'state/component-repository/components/const';

export const LIST_ECR_COMPONENTS_OK = [
  {
    code: 'example-bundle-1',
    title: 'Example bundle 1 title',
    description: 'Example bundle description 1',
    thumbnail: redhatImg,
    componentTypes: [
      'bundle',
    ],
    installedJob: null,
    lastJob: {
      id: 'eac7fce5-688d-4826-9257-08eeb6bb0f04',
      componentId: 'cms-quickstart-bundle',
      componentName: 'Entando Example CMS Bundle',
      componentVersion: 'v0.0.2',
      startedAt: '2020-07-27T15:47:14.573',
      finishedAt: '2020-07-27T15:47:16.372',
      status: 'INSTALL_ROLLBACK',
      componentJobs: [],
    },
    versions: [
      {
        version: 'v0.0.1',
      },
      {
        version: 'v0.0.2',
      },
    ],
    latestVersion: {
      version: 'v0.0.2',
    },
    installed: false,
    customInstallation: null,
  },
  {
    code: 'installed-example-bundle',
    title: 'Example bundle title',
    description: 'Example bundle description, this bundle contains lastUpdate!',
    thumbnail: null,
    componentTypes: [
      'pageTemplate',
      'bundle',
      'widget',
    ],
    installedJob: {
      id: '6a5b0d30-729e-49c1-be66-48f4eee4c4af',
      componentId: 'installed-example-bundle',
      componentName: 'Example bundle title',
      componentVersion: 'v0.0.1',
      startedAt: '2020-07-27T11:14:56.79',
      finishedAt: '2020-07-27T11:15:01.395',
      status: 'INSTALL_COMPLETED',
      componentJobs: [],
    },
    lastJob: {
      id: '6a5b0d30-729e-49c1-be66-48f4eee4c4af',
      componentId: 'installed-example-bundle',
      componentName: 'Example bundle title',
      componentVersion: 'v0.0.1',
      startedAt: '2020-07-27T11:14:56.79',
      finishedAt: '2020-07-27T11:15:01.395',
      status: 'INSTALL_COMPLETED',
      componentJobs: [],
    },
    lastUpdate: '2020-07-27T11:14:56.79',
    versions: [
      {
        version: 'v0.0.1',
      },
    ],
    latestVersion: {
      version: 'v0.0.1',
    },
    installed: true,
    customInstallation: true,
  },
  {
    code: 'regular-3-version-bundle',
    title: 'Regular 3 version bundle',
    description: 'Example bundle description',
    thumbnail: null,
    componentTypes: [
      'pageTemplate',
      'bundle',
      'widget',
    ],
    installedJob: null,
    lastJob: null,
    versions: [
      {
        version: 'v0.0.1',
      },
      {
        version: 'v0.0.2',
      },
      {
        version: 'v0.0.3',
      },
    ],
    latestVersion: {
      version: 'v0.0.3',
    },
    installed: false,
    customInstallation: false,
  },
  {
    code: 'install-error-bundle',
    title: 'Failed install bundle',
    description: 'Example bundle description: INSTALL_ERROR, fragment, contentTemplate, widget, plugin, pageTemplate, page, bundle, contentType',
    thumbnail: null,
    componentTypes: [
      'fragment',
      'contentTemplate',
      'widget',
      'plugin',
      'pageTemplate',
      'page',
      'bundle',
      'contentType',
    ],
    installedJob: null,
    lastJob: {
      id: '5743fc3c-5e16-4d5f-9d50-bc5842509e6c',
      componentId: 'install-error-bundle',
      componentName: 'Failed install bundle',
      componentVersion: 'v0.0.2',
      startedAt: '2020-07-27T11:14:52.967',
      finishedAt: '2020-07-27T11:14:55.187',
      status: 'INSTALL_ERROR',
      errorMessage: 'Error reading bundle',
      componentJobs: [],
    },
    versions: [
      {
        version: 'v0.0.2',
      },
      {
        version: 'v0.0.1',
      },
      {
        version: '0.0.1',
      },
    ],
    latestVersion: {
      version: 'v0.0.2',
    },
    installed: false,
    customInstallation: null,
  },
  {
    code: 'example-bundle-7',
    title: 'Installed latest version bundle',
    description: 'Example bundle description',
    thumbnail: null,
    componentTypes: [
      'pageTemplate',
      'bundle',
      'fragment',
    ],
    installedJob: {
      id: '0bcc2f12-3e36-4ec5-a5f8-fde416507d84',
      componentId: 'example-bundle-7',
      componentName: 'Installed latest version bundle',
      componentVersion: 'v0.0.2',
      startedAt: '2020-07-27T11:14:53.811',
      finishedAt: '2020-07-27T11:14:56.015',
      status: 'INSTALL_COMPLETED',
      componentJobs: [],
    },
    lastJob: {
      id: '0bcc2f12-3e36-4ec5-a5f8-fde416507d84',
      componentId: 'example-bundle-7',
      componentName: 'Installed latest version bundle',
      componentVersion: 'v0.0.2',
      startedAt: '2020-07-27T11:14:53.811',
      finishedAt: '2020-07-27T11:14:56.015',
      status: 'INSTALL_COMPLETED',
      componentJobs: [],
    },
    versions: [
      {
        version: 'v0.0.2',
      },
      {
        version: 'v0.0.1',
      },
    ],
    latestVersion: {
      version: 'v0.0.2',
    },
    installed: true,
    customInstallation: false,
  },
];

export const GET_ECR_COMPONENT_OK = LIST_ECR_COMPONENTS_OK[0];

const componentInstallation = {
  componentId: 'component_id',
  componentName: 'Component Name',
  componentVersion: '5.1.0',
  started: 1548855801000,
  ended: 1548855803000,
  user: 'admin',
  progress: 1,
  errorMessage: null,
};

export const COMPONENT_INSTALLATION_CREATED = {
  ...componentInstallation,
  status: ECR_COMPONENT_INSTALLATION_STATUS_CREATED,
};

export const COMPONENT_INSTALLATION_IN_PROGRESS = {
  ...componentInstallation,
  status: ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
};

export const COMPONENT_INSTALLATION_COMPLETED = {
  ...componentInstallation,
  status: ECR_COMPONENT_INSTALLATION_STATUS_COMPLETED,
};

export const COMPONENT_INSTALLATION_ERROR = {
  ...componentInstallation,
  status: ECR_COMPONENT_INSTALLATION_STATUS_ERROR,
};

export const COMPONENT_UNINSTALLATION_CREATED = {
  ...componentInstallation,
  status: ECR_COMPONENT_UNINSTALLATION_STATUS_CREATED,
};

export const COMPONENT_UNINSTALLATION_IN_PROGRESS = {
  ...componentInstallation,
  status: ECR_COMPONENT_UNINSTALLATION_STATUS_IN_PROGRESS,
};

export const COMPONENT_UNINSTALLATION_COMPLETED = {
  ...componentInstallation,
  status: ECR_COMPONENT_UNINSTALLATION_STATUS_COMPLETED,
};

export const COMPONENT_UNINSTALLATION_ERROR = {
  ...componentInstallation,
  status: ECR_COMPONENT_UNINSTALLATION_STATUS_ERROR,
};

export const COMPONENT_USAGE_LIST = [{
  code: 'test-widget',
  type: 'widget',
  usage: 1,
}, {
  code: 'test-fragment',
  type: 'fragment',
  usage: 0,
}, {
  code: 'test-page',
  type: 'page',
  usage: 2,
}];

export const COMPONENT_INSTALL_PLAN = {
  hasConflicts: true,
  widgets: {
    'conference-form-widget': {
      status: 'DIFF',
      updateTime: '1997-07-16T19:20:30+01:00',
      hash: 'sadklsadjlkdjaskldjskaljdsakljdalks',
      action: null,
    },
    'conference-details-widget': {
      status: 'NEW',
      updateTime: '1997-07-16T19:20:30+01:00',
      hash: 'sadklsadjlkdjaskldjskaljdsakljdalks',
      action: null,
    },
  },
  fragments: {
    jacms_content_viewer_list_userfilter_ent_text: {
      status: 'EQUAL',
      updateTime: '1997-07-16T19:20:30+01:00',
      hash: 'sadklsadjlkdjaskldjskaljdsakljdalks',
      action: null,
    },
    jacms_content_viewer_list_userfilter_met_category: {
      status: 'DIFF',
      updateTime: '1997-07-16T19:20:30+01:00',
      hash: 'sadklsadjlkdjaskldjskaljdsakljdalks',
      action: null,
    },
    jacms_content_viewer_list_userfilter_ent_checkbox: {
      status: 'NEW',
      updateTime: '1997-07-16T19:20:30+01:00',
      hash: 'sadklsadjlkdjaskldjskaljdsakljdalks',
      action: null,
    },
  },
  pages: {
    news: {
      status: 'NEW',
      updateTime: '1997-07-16T19:20:30+01:00',
      hash: 'sadklsadjlkdjaskldjskaljdsakljdalks',
      action: null,
    },
  },
  pageTemplates: {
    'content-page': {
      status: 'DIFF',
      updateTime: '1997-07-16T19:20:30+01:00',
      hash: 'sadklsadjlkdjaskldjskaljdsakljdalks',
      action: null,
    },
  },
  contents: {
    NWS5: {
      status: 'DIFF',
      updateTime: '1997-07-16T19:20:30+01:00',
      hash: 'sadklsadjlkdjaskldjskaljdsakljdalks',
      action: null,
    },
  },
  contentTemplates: {
    10003: {
      status: 'DIFF',
      updateTime: '1997-07-16T19:20:30+01:00',
      hash: 'sadklsadjlkdjaskldjskaljdsakljdalks',
      action: null,
    },
  },
  contentTypes: {
    TCL: {
      status: 'DIFF',
      updateTime: '1997-07-16T19:20:30+01:00',
      hash: 'sadklsadjlkdjaskldjskaljdsakljdalks',
      action: null,
    },
  },
  assets: {
    entandoAtPlan: {
      status: 'DIFF',
      updateTime: '1997-07-16T19:20:30+01:00',
      hash: 'sadklsadjlkdjaskldjskaljdsakljdalks',
      action: null,
    },
  },
  directories: {},
  resources: {
    '/extract-bundle': {
      status: 'DIFF',
      updateTime: '1997-07-16T19:20:30+01:00',
      hash: 'sadklsadjlkdjaskldjskaljdsakljdalks',
      action: null,
    },
  },
  plugins: {
    'lcorsettientando-xmasbundle': {
      status: 'DIFF',
      updateTime: '1997-07-16T19:20:30+01:00',
      hash: 'sadklsadjlkdjaskldjskaljdsakljdalks',
      action: null,
    },
  },
  categories: {},
  groups: {
    free: {
      status: 'DIFF',
      updateTime: '1997-07-16T19:20:30+01:00',
      hash: 'sadklsadjlkdjaskldjskaljdsakljdalks',
      action: null,
    },
    administrators: {
      status: 'DIFF',
      updateTime: '1997-07-16T19:20:30+01:00',
      hash: 'sadklsadjlkdjaskldjskaljdsakljdalks',
      action: null,
    },
  },
  labels: {
    ENTANDO_API_GOTO_DETAILS: {
      status: 'DIFF',
      updateTime: '1997-07-16T19:20:30+01:00',
      hash: 'sadklsadjlkdjaskldjskaljdsakljdalks',
      action: null,
    },
  },
  languages: {
    en: {
      status: 'DIFF',
      updateTime: '1997-07-16T19:20:30+01:00',
      hash: 'sadklsadjlkdjaskldjskaljdsakljdalks',
      action: null,
    },
    it: {
      status: 'DIFF',
      updateTime: '1997-07-16T19:20:30+01:00',
      hash: 'sadklsadjlkdjaskldjskaljdsakljdalks',
      action: null,
    },
  },
};

export const FAILED_INSTALL_PLAN = {
  id: '7183b6a5-9b26-4f2b-ac3a-646417513e17',
  componentId: 'xmasbundle',
  componentName: 'xmasbundle-bundle',
  componentVersion: '0.0.7',
  startedAt: '2021-05-06T09:35:04.132865',
  finishedAt: '2021-05-06T09:35:06.629047',
  progress: 0.0,
  status: 'INSTALL_ERROR',
  installErrorCode: 100,
  installErrorMessage: 'The plugin lcorsettientando-xmasbundle descriptor contains an invalid descriptorVersion',
  rollbackErrorCode: 100,
  rollbackErrorMessage: 'Rollback ERROR!!!!',
  installPlan: '{"hasConflicts":null,"widgets":{},"fragments":{},"pages":{},"pageTemplates":{},"contents":{},"contentTemplates":{},"contentTypes":{},"assets":{},"directories":{},"resources":{},"plugins":{},"categories":{},"groups":{},"labels":{},"languages":{},"version":"latest"}',
  customInstallation: false,
};

export const GET_COMPONENT_INSTALL_PLAN = {
  componentId: "xmasbundle",
  componentName: "xmasbundle-bundle",
  componentVersion: "0.0.6",
  customInstallation: false,
  finishedAt: "2021-05-24T14:54:04.093411",
  id: "ffb9fdee-b1d9-4620-8e11-6fa857da4f6e",
  installPlan: "{\"hasConflicts\":null,\"widgets\":{},\"fragments\":{},\"pages\":{},\"pageTemplates\":{},\"contents\":{},\"contentTemplates\":{},\"contentTypes\":{},\"assets\":{},\"directories\":{},\"resources\":{},\"plugins\":{},\"categories\":{},\"groups\":{},\"labels\":{},\"languages\":{},\"version\":\"0.0.6\"}",
  progress: 1,
  startedAt: "2021-05-24T14:51:55.634321",
  status: "INSTALL_COMPLETED",
}