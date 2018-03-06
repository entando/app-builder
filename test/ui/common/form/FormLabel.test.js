import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import FormLabel from 'ui/common/form/FormLabel';

const LABEL_ID = 'label.id';
const LANG_LABEL_ID = 'lang.label.id';
const HELP_ID = 'help.id';

describe('FormLabel', () => {
  let component;

  describe('with labelId only', () => {
    beforeEach(() => {
      component = shallow(<FormLabel labelId={LABEL_ID} />);
    });
    it('render component without crash', () => {
      expect(component.exists()).toBe(true);
    });
    it('does not render the required icon', () => {
      expect(component.find('.fa-asterisk').exists()).toBe(false);
    });
    it('does not render the help popover', () => {
      expect(component.find('FieldLevelHelp').exists()).toBe(false);
    });
    it('does not render the language label', () => {
      expect(component.find('.FormLabel__language-label').exists()).toBe(false);
    });
  });

  describe('with langLabelId', () => {
    beforeEach(() => {
      component = shallow(<FormLabel labelId={LABEL_ID} langLabelId={LANG_LABEL_ID} />);
    });
    it('renders the language label', () => {
      expect(component.find('.FormLabel__language-label').exists()).toBe(true);
    });
  });

  describe('with helpId', () => {
    beforeEach(() => {
      component = shallow(<FormLabel labelId={LABEL_ID} helpId={HELP_ID} />);
    });
    it('renders the help popover', () => {
      expect(component.find('FieldLevelHelp').exists()).toBe(true);
    });
  });

  describe('with required', () => {
    beforeEach(() => {
      component = shallow(<FormLabel labelId={LABEL_ID} required />);
    });
    it('renders the required icon', () => {
      expect(component.find('.fa-asterisk').exists()).toBe(true);
    });
  });
});
