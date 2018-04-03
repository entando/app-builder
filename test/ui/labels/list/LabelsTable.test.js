import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import LabelsTable from 'ui/labels/list/LabelsTable';

import { LABELS_LIST } from 'test/mocks/labels';

const LANG_NAME = 'English';
const onClickDeleteLabelMock = jest.fn();
const onClickEditLabelMock = jest.fn();


describe('LabelsTable', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
    component = shallow((
      <LabelsTable
        langName={LANG_NAME}
        labels={LABELS_LIST}
        onClickDeleteLabel={onClickDeleteLabelMock}
        onClickEditLabel={onClickEditLabelMock}
      />
    ));
  });

  it('has class LabelsTable', () => {
    expect(component.hasClass('LabelsTable')).toBe(true);
  });

  it('has as many label rows as the labels', () => {
    expect(component.find('.LabelsTable__label-row')).toHaveLength(LABELS_LIST.length);
  });

  it('clicking on a delete button will call onClickDeleteLabel', () => {
    const onClick = component.find('.LabelsTable__delete-btn').first().prop('onClick');
    onClick();
    expect(onClickDeleteLabelMock).toHaveBeenCalledWith(LABELS_LIST[0].key);
  });

  it('clicking on an edit button will call onClickDeleteLabel', () => {
    const onClick = component.find('.LabelsTable__edit-btn').first().prop('onClick');
    onClick();
    expect(onClickEditLabelMock).toHaveBeenCalledWith(LABELS_LIST[0].key);
  });
});
