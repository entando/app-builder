import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import DatabaseDumpTablePage from 'ui/database/dump/DatabaseDumpTablePage';

const props = {
  onWillMount: jest.fn(),
  dumpData: '',
};

describe('DatabaseDumpTablePage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DatabaseDumpTablePage {...props} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('root component has class DatabaseDumpTablePage', () => {
    expect(component.hasClass('DatabaseDumpTablePage')).toBe(true);
  });
});
