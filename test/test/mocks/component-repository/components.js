import { leonardoImg, redhatImg1, redhatImg2 } from 'test/mocks/component-repository/componentImages';
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
    id: '3e7d3e0a-fa4e-494a-90d5-2d0bf6899433',
    name: 'Leonardo Theme',
    lastUpdate: '2018-08-21',
    version: '5.1.0',
    type: 'pageModel',
    description: 'lorem ipsum',
    image: leonardoImg,
    rating: 2.2,
    installed: true,
  },
  {
    id: 'a7233e30-e6f0-4c90-9786-e3667113be12',
    name: 'Avatar plugin',
    lastUpdate: '2018-08-22',
    version: '5.1.0',
    type: 'widget',
    description: 'lorem ipsum',
    image: '',
    rating: 3.4,
    installed: false,
  },
  {
    id: '8cb35c52-bab6-4403-bc50-ec539754df65',
    name: 'RedHat Fragment',
    lastUpdate: '2018-09-23',
    version: '5.1.0',
    type: 'fragment',
    description: 'lorem ipsum',
    image: null,
    rating: 4.2,
    installed: false,
  },
  {
    id: 'ccf97995-3ab9-4322-bf45-8ca3dbf5a86d',
    name: 'RedHat Component',
    lastUpdate: '2018-08-24',
    version: '5.1.0',
    type: 'component',
    description: 'lorem ipsum',
    image: redhatImg1,
    rating: 5,
    installed: true,
  },
  {
    id: '950ce42d-de18-47a8-bb19-621b5751af55\n',
    name: 'Entando Component',
    lastUpdate: '2018-08-25',
    version: '5.1.0',
    type: 'component',
    description: 'lorem ipsum',
    image: redhatImg2,
    rating: 4.3,
    installed: false,
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
}];
