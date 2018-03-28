import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import LabelsTabs from 'ui/labels/list/LabelsTabs';

import { LABELS_LIST } from 'test/mocks/labels';
import { LANGUAGES_LIST } from 'test/mocks/languages';

const onClickDeleteLabelMock = jest.fn();
const onClickEditLabelMock = jest.fn();


describe('LabelsTabs', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
    component = shallow((
      <LabelsTabs
        languages={LANGUAGES_LIST}
        labels={LABELS_LIST}
        onClickDeleteLabel={onClickDeleteLabelMock}
        onClickEditLabel={onClickEditLabelMock}
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
      expect(labelTable.prop('onClickDeleteLabel')).toBe(onClickDeleteLabelMock);
    });
  });

  it('should pass onClickEditLabel down to LabelTables', () => {
    component.find('LabelTable').forEach((labelTable) => {
      expect(labelTable.prop('onClickEditLabel')).toBe(onClickEditLabelMock);
    });
  });
});
