import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import LabelsTable from 'ui/labels/list/LabelsTable';

import { LABELS_LIST } from 'test/mocks/labels';

const LANG_NAME = 'English';
const onClickDelete = jest.fn();

describe('LabelsTable', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
    component = shallow((
      <LabelsTable
        langName={LANG_NAME}
        labels={LABELS_LIST}
        onClickDelete={onClickDelete}
      />
    ));
  });

  it('has class LabelsTable', () => {
    expect(component.hasClass('LabelsTable')).toBe(true);
  });

  it('has as many label rows as the labels', () => {
    expect(component.find('.LabelsTable__label-row')).toHaveLength(LABELS_LIST.length);
  });
});
