import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import SinglePageSettingsModal from 'ui/pages/config/SinglePageSettingsModal';

const ON_CANCEL = jest.fn();
const ON_SAVE = jest.fn();

describe('SinglePageSettingsModal', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
    component = shallow((
      <SinglePageSettingsModal
        onCancel={ON_CANCEL}
        onSave={ON_SAVE}
      />
    ));
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
