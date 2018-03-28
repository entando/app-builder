import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import ActiveLangTable from 'ui/labels/list/ActiveLangTable';

import { LANGUAGES_LIST } from 'test/mocks/languages';

const activeLanguages = LANGUAGES_LIST.filter(item => item.isActive);
const defaultLanguage = LANGUAGES_LIST.filter(item => item.isDefault)[0].code;

const onDeactivateLang = jest.fn();

describe('ActiveLangTable', () => {
  let component;
  component = shallow(<ActiveLangTable />);

  it('renders without crash', () => {
    expect(component.exists()).toBe(true);
  });

  it('has class ActiveLangTable', () => {
    expect(component.hasClass('ActiveLangTable')).toBe(true);
  });

  describe('without activeLanguages', () => {
    it('renders an Alert component', () => {
      expect(component.find('Alert')).toHaveLength(1);
    });
  });

  describe('has activeLanguages', () => {
    beforeEach(() => {
      component = shallow((
        <ActiveLangTable
          activeLanguages={activeLanguages}
          onDeactivateLang={onDeactivateLang}
          defaultLanguage={defaultLanguage}
        />
      ));
    });

    it('has as many language rows as the active languages', () => {
      expect(component.find('.ActiveLangTable__tr')).toHaveLength(activeLanguages.length);
    });

    it('clicking on a delete button will call onDeactivateLang', () => {
      component.find('.ActiveLangTable__delete-tag-btn').first().simulate('click');
      expect(onDeactivateLang).toHaveBeenCalledWith(activeLanguages[0].code);
    });
  });
});
