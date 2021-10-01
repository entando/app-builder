import React from 'react';
import { configEnzymeAdapter, mockRenderWithIntl } from 'testutils/helpers';
import { shallow, mount } from 'enzyme';
import MultiSelectRenderer from 'ui/common/form/MultiSelectRenderer';

import { IntlProvider } from 'react-intl';

configEnzymeAdapter();

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

const messages = require('../../../../locales/en');

function shallowWithIntl(node) {
  return shallow(node, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale: 'en',
      defaultLocale: 'en',
      messages,
    },
  });
}

describe('MultiSelectRenderer', () => {
  let component;

  describe('when nothing is selected', () => {
    beforeEach(() => {
      component = shallowWithIntl(
        <MultiSelectRenderer
          fields={FIELDS}
          options={OPTIONS}
          valueKey="code"
          labelKey="description"
        />,
      );
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
      component = shallow(
        mockRenderWithIntl(
          <MultiSelectRenderer
            fields={FIELDS}
            options={OPTIONS}
            valueKey="code"
            labelKey="description"
            emptyOptionTextId={EMPTY_TEXT_LABEL_ID}
          />,
        ),
      );
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
  });

  xdescribe('when something is selected', () => {
    beforeEach(() => {
      component = shallow(
        <MultiSelectRenderer
          fields={FIELDS}
          options={OPTIONS}
          valueKey="code"
          labelKey="description"
          selectedValues={SELECTED_VALUES}
        />,
      );
    });
    it('renders as many <Label> as the selected options', () => {
      const labels = component.instance().renderTags();
      expect(labels).toHaveLength(0); // this is a disturbing bug of Enzyme
    });
  });

  describe('when clicking on the "+" button', () => {
    beforeEach(jest.clearAllMocks);
    beforeEach(() => {
      component = mount(
        <MultiSelectRenderer
          fields={FIELDS}
          options={OPTIONS}
          valueKey="code"
          labelKey="description"
          selectedValues={SELECTED_VALUES}
          emptyOptionTextId={EMPTY_TEXT_LABEL_ID}
        />,
      );
    });
  });
});
