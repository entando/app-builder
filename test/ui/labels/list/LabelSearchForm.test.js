import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { LabelSearchFormBody } from 'ui/labels/list/LabelSearchForm';

const handleSubmit = jest.fn();

describe('LabelSearchFormBody', () => {
  let labelSearchForm;

  describe('basic render tests', () => {
    beforeEach(() => {
      labelSearchForm = shallow(<LabelSearchFormBody handleSubmit={handleSubmit} />);
    });
    it('root component renders without crashing', () => {
      expect(labelSearchForm.exists()).toEqual(true);
    });

    it('root component renders language field', () => {
      const text = labelSearchForm.find('.LabelSearchForm__text-field');
      expect(text.exists()).toEqual(true);
    });
  });

  describe('event handlers test', () => {
    const preventDefault = jest.fn();
    beforeEach(() => {
      labelSearchForm = shallow(<LabelSearchFormBody handleSubmit={handleSubmit} />);
    });

    it('on form submit calls handleSubmit', () => {
      labelSearchForm.find('form').simulate('submit', { preventDefault });
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
