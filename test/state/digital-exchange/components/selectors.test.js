import { LIST_DE_COMPONENTS_OK, COMPONENT_INSTALLATION_IN_PROGRESS } from 'test/mocks/digital-exchange/components';
import {
  getDEComponents, getDEComponentSelected,
  getDEComponentList, getDEComponentInstallation,
} from 'state/digital-exchange/components/selectors';
import { DE_COMPONENTS_INSTALLATION_PROGRESS } from 'state/digital-exchange/components/const';

const list = LIST_DE_COMPONENTS_OK;
const installation = {
  [COMPONENT_INSTALLATION_IN_PROGRESS.componentId]: { state: DE_COMPONENTS_INSTALLATION_PROGRESS },
};

const MOCK_STATE = {
  digitalExchangeComponents: {
    list,
    selected: list[0],
    installation,
  },
};

describe('state/digital-exchange/components/selectors', () => {
  it('getDEComponents(state) returns the digitalExchangeComponents object', () => {
    const digitalExchangeComponents = getDEComponents(MOCK_STATE);
    expect(digitalExchangeComponents).toBe(MOCK_STATE.digitalExchangeComponents);
  });

  it('getDEComponentSelected(state) returns the selected object', () => {
    const selected = getDEComponentSelected(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.digitalExchangeComponents.selected);
  });

  it('verify getDEComponentList selector', () => {
    expect(getDEComponentList(MOCK_STATE)).toEqual(MOCK_STATE.digitalExchangeComponents.list);
  });

  it('verify getDEComponentInstallation selector', () => {
    const props = {
      component: {
        id: COMPONENT_INSTALLATION_IN_PROGRESS.componentId,
      },
    };
    const installationStatus = getDEComponentInstallation(MOCK_STATE, props);
    expect(installationStatus).toEqual(DE_COMPONENTS_INSTALLATION_PROGRESS);
  });
});
