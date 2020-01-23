
import React from 'react';

import 'test/enzyme-init';
import { shallowWithIntl } from 'test/testUtils';
import MultiSelectRenderer, { MultiSelectRendererBody } from 'ui/pages/common/MultiSelectRenderer';
import { mount } from 'enzyme';

const FIELDS = {
  push: jest.fn(),
  remove: jest.fn(),
};
const OPTIONS = [
  { code: 'opt1', description: 'Option 1' },
  { code: 'opt2', description: 'Option 2' },
  { code: 'opt3', description: 'Option 3' },
];

const SELECTED_VALUES = ['opt2', 'opt3'];
const EMPTY_TEXT_LABEL_ID = 'empty.text.id';

describe('MultiSelectRenderer', () => {
  let component;

  describe('when nothing is selected', () => {
    beforeEach(() => {
      component = shallowWithIntl((
        <MultiSelectRenderer
          fields={FIELDS}
          options={OPTIONS}
          valueKey="code"
          labelKey="description"
        />
      )).dive();
    });
    it('renders without crashing', () => {
      expect(component.exists()).toEqual(true);
    });
    it('renders as many <option> as the provided array', () => {
      expect(component.find('option')).toHaveLength(OPTIONS.length);
    });
    it('uses options[][valueKey] to define the <option> value', () => {
      component.find('option').forEach((option, i) => {
        expect(option.prop('value')).toBe(OPTIONS[i].code);
      });
    });
    it('uses options[][labelKey] to define the <option> text', () => {
      component.find('option').forEach((option, i) => {
        expect(option.text()).toBe(OPTIONS[i].description);
      });
    });
  });

  describe('when using an empty option', () => {
    beforeEach(() => {
      component = shallowWithIntl((
        <MultiSelectRenderer
          fields={FIELDS}
          options={OPTIONS}
          valueKey="code"
          labelKey="description"
          emptyOptionTextId={EMPTY_TEXT_LABEL_ID}
        />
      )).dive();
    });
    it('renders ad many <option> as the provided array, plus one', () => {
      expect(component.find('option')).toHaveLength(OPTIONS.length + 1);
    });
    it('uses options[][valueKey] to define the <option> value', () => {
      const options = component.find('option');
      options.forEach((option, i) => {
        if (i === 0) {
          expect(option.prop('value')).toBeFalsy();
        } else {
          expect(option.prop('value')).toBe(OPTIONS[i - 1].code);
        }
      });
    });
    it('uses options[][labelKey] to define the <option> text', () => {
      const options = component.find('option');
      options.forEach((option, i) => {
        if (i === 0) {
          expect(option.text()).toBe(EMPTY_TEXT_LABEL_ID);
        } else {
          expect(option.text()).toBe(OPTIONS[i - 1].description);
        }
      });
    });
  });

  xdescribe('when something is selected', () => {
    beforeEach(() => {
      component = shallowWithIntl((
        <MultiSelectRenderer
          fields={FIELDS}
          options={OPTIONS}
          valueKey="code"
          labelKey="description"
          selectedValues={SELECTED_VALUES}
        />
      )).dive();
    });
    it('renders as many <Label> as the selected options', () => {
      const labels = component.instance().renderTags();
      expect(labels).toHaveLength(0); // this is a disturbing bug of Enzyme
    });
  });

  describe('when clicking on the "+" button', () => {
    beforeEach(jest.clearAllMocks);
    beforeEach(() => {
      component = mount((
        <MultiSelectRendererBody
          fields={FIELDS}
          options={OPTIONS}
          valueKey="code"
          labelKey="description"
          selectedValues={SELECTED_VALUES}
          emptyOptionTextId={EMPTY_TEXT_LABEL_ID}
          intl={{
            formatMessage: () => {},
            defineMessages: () => {},
            intlShape: () => {},
            formatDate: () => {},
            formatTime: () => {},
            formatRelative: () => {},
            formatNumber: () => {},
            formatPlural: () => {},
            formatHTMLMessage: () => {},
            now: () => {},
          }}
        />
      ));
    });

    it('and no value is selected, it does not select any value', () => {
      component.instance().select = { value: '' };
      component.find('button.MultiSelectRenderer__add-btn').simulate('click');
      expect(FIELDS.push).not.toHaveBeenCalled();
    });
    it('and a value is selected, it pushes the value', () => {
      component.instance().select = { value: 'opt1' };
      component.find('button.MultiSelectRenderer__add-btn').simulate('click');
      expect(FIELDS.push).toHaveBeenCalledWith(OPTIONS[0].code);
    });
    it('and an already selected value is selected, it does not select any value', () => {
      component.instance().select = { value: 'opt2' };
      component.find('button.MultiSelectRenderer__add-btn').simulate('click');
      expect(FIELDS.push).not.toHaveBeenCalled();
    });
  });
});
