import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import ActiveLanguagesFields from 'ui/common/form/ActiveLanguagesFields';
import { LANGUAGES_LIST } from 'test/mocks/languages';

const activeLanguages = LANGUAGES_LIST.filter(language => (language.isActive));
const defaultLanguage = LANGUAGES_LIST.filter(language => (language.isDefault))[0].code;
const onChangeDefaultTitle = jest.fn();

describe('ActiveLanguagesFields', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ActiveLanguagesFields
      activeLanguages={activeLanguages}
      defaultLanguage={defaultLanguage}
      onChangeDefaultTitle={onChangeDefaultTitle}
    />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('verify if has class ActiveLanguagesFields', () => {
    expect(component.hasClass('ActiveLanguagesFields')).toEqual(true);
  });
});
