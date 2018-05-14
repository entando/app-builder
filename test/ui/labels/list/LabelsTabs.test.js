import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import LabelsTabs from 'ui/labels/list/LabelsTabs';

import { LABELS_LIST } from 'test/mocks/labels';
import { LANGUAGES_LIST } from 'test/mocks/languages';

const onClickDelete = jest.fn();

describe('LabelsTabs', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
    component = shallow((
      <LabelsTabs
        languages={LANGUAGES_LIST}
        labels={LABELS_LIST}
        onClickDelete={onClickDelete}
      />
    ));
  });

  it('has class LabelsTabs', () => {
    expect(component.hasClass('LabelsTabs')).toBe(true);
  });

  it('has as many tabs rows as the languages', () => {
    expect(component.find('Tab')).toHaveLength(LANGUAGES_LIST.length);
  });

  it('should pass onClickDeleteLabel down to LabelTables', () => {
    component.find('LabelTable').forEach((labelTable) => {
      expect(labelTable.prop('onClickDelete')).toBe(onClickDelete);
    });
  });
});
