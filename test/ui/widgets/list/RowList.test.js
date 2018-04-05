import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import RowList from 'ui/widgets/list/RowList';


const rows = [
  {
    code: 'code1',
    name: 'name1',
    titles: {
      en: 'name1',
      it: 'name1',
    },
    used: 5,
  },
  {
    code: 'code2',
    name: 'name2',
    titles: {
      en: 'name2',
      it: 'name2',
    },
    used: 1,
  },
];

const TABLEROWMOCK = (
  <RowList tableRow={rows} locale="en" />
);

let component;
describe('RowList', () => {
  beforeEach(() => {
    component = shallow(TABLEROWMOCK);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });
});
