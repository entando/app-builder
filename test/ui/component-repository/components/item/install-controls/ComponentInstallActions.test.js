import React from 'react';
import 'test/enzyme-init';
import { shallowWithIntl } from 'test/testUtils';
import ComponentInstallActions from 'ui/component-repository/components/item/install-controls/ComponentInstallActions';

import { GET_ECR_COMPONENT_OK } from 'test/mocks/component-repository/components';

describe('ComponentInstallActions', () => {
  let component;
  beforeEach(() => {
    component = shallowWithIntl(<ComponentInstallActions component={GET_ECR_COMPONENT_OK} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
