import React from 'react';

import { configEnzymeAdapter } from 'test/testUtils';
import { shallow } from 'enzyme';
import AssetsUpload from 'ui/assets/AssetsUpload';

configEnzymeAdapter();

describe('AssetsUpload component', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AssetsUpload />);
  });
  it('renders single component without crashing', () => {
    expect(component.exists()).toEqual(true);
    expect(component.find('.UploadAsset')).toHaveLength(1);
  });
});
