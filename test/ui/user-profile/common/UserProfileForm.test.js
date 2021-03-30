import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { UserProfileFormBody } from 'ui/user-profile/common/UserProfileForm';
import { mockIntl } from 'test/legacyTestUtils';


const onWillMount = jest.fn();
const onSubmit = jest.fn();
const handleSubmit = jest.fn();
const invalid = false;
const submitting = false;
const defaultLanguage = 'en';
const languages = [{ code: 'en', name: 'English' }, { code: 'it', name: 'Italian' }];
const profileTypesAttributes = [];

beforeEach(jest.clearAllMocks);

describe('UserProfileFormBody', () => {
  let component;
  beforeEach(() => {
    component = shallow(<UserProfileFormBody
      onWillMount={onWillMount}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      invalid={invalid}
      submitting={submitting}
      defaultLanguage={defaultLanguage}
      languages={languages}
      profileTypesAttributes={profileTypesAttributes}
      intl={mockIntl}
    />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('calls onWillMount', () => {
    expect(onWillMount).toHaveBeenCalled();
  });
});


const getFormInstance = attributes => shallow(<UserProfileFormBody
  onWillMount={onWillMount}
  onSubmit={onSubmit}
  handleSubmit={handleSubmit}
  invalid={invalid}
  submitting={submitting}
  defaultLanguage={defaultLanguage}
  languages={languages}
  profileTypesAttributes={Array.isArray(attributes) ? attributes : [attributes]}
  intl={mockIntl}
/>);


const testSingleAttributeIsRendered = (attribute) => {
  describe(`with attribute of type ${attribute.type}`, () => {
    let component;
    beforeEach(() => {
      component = getFormInstance(attribute);
    });

    it('renders a field for the attribute', () => {
      expect(component.find(`Field[name="${attribute.code}"]`)).toExist();
    });
  });
};

testSingleAttributeIsRendered({ type: 'Text', code: 'myText' });
testSingleAttributeIsRendered({ type: 'Longtext', code: 'myLongtext' });
testSingleAttributeIsRendered({ type: 'Monotext', code: 'myMonotext' });
testSingleAttributeIsRendered({ type: 'Hypertext', code: 'myHypertext' });

testSingleAttributeIsRendered({ type: 'Number', code: 'myNumber' });

testSingleAttributeIsRendered({ type: 'Boolean', code: 'myBoolean' });
testSingleAttributeIsRendered({ type: 'CheckBox', code: 'myCheckBox' });
testSingleAttributeIsRendered({ type: 'ThreeState', code: 'myThreeState' });


testSingleAttributeIsRendered({ type: 'Date', code: 'myDate' });
testSingleAttributeIsRendered({ type: 'Timestamp', code: 'myTimestamp' });


testSingleAttributeIsRendered({
  type: 'EnumeratorMap',
  code: 'myEnumeratorMap',
  enumeratorStaticItems: 'nipote1=qui,nipote2=quo,nipote3=qua',
  enumeratorStaticItemsSeparator: ',',
});


describe('with attribute of type Enumerator (mandatory)', () => {
  let component;
  beforeEach(() => {
    component = getFormInstance({
      type: 'Enumerator',
      code: 'myEnumerator',
      enumeratorStaticItems: 'pippo,pluto,paperino',
      enumeratorStaticItemsSeparator: ',',
      mandatory: true,
    });
  });

  it('renders a Field for the attribute', () => {
    expect(component.find('Field[name="myEnumerator"]')).toExist();
  });

  it('passes an option for each item', () => {
    const options = component.find('Field[name="myEnumerator"]').prop('options');
    expect(options.length).toBe(3);
  });
});

describe('with attribute of type Enumerator (NOT mandatory)', () => {
  let component;
  beforeEach(() => {
    component = getFormInstance({
      type: 'Enumerator',
      code: 'myEnumerator',
      enumeratorStaticItems: 'pippo,pluto,paperino',
      enumeratorStaticItemsSeparator: ',',
      mandatory: false,
    });
  });

  it('renders a Field for the attribute', () => {
    expect(component.find('Field[name="myEnumerator"]')).toExist();
  });

  it('passes an option for each item, plus one empty', () => {
    const options = component.find('Field[name="myEnumerator"]').prop('options');
    expect(options.length).toBe(4);
  });
});


describe('with attribute of type Monolist', () => {
  let component;
  beforeEach(() => {
    component = getFormInstance({
      type: 'Monolist',
      code: 'myMonolist',
      nestedAttribute: { type: 'Text', code: 'myText' },
    });
  });

  it('renders a FieldArray for the attribute', () => {
    expect(component.find('FieldArray[name="myMonolist"]')).toExist();
  });
});


describe('with attribute of type List', () => {
  let component;
  beforeEach(() => {
    component = getFormInstance({
      type: 'List',
      code: 'myList',
      nestedAttribute: { type: 'Text', code: 'myText' },
    });
  });

  it('renders a FieldArray for each language', () => {
    languages.forEach((langItem) => {
      expect(component.find(`FieldArray[name="myList.${langItem.code}"]`)).toExist();
    });
  });
});


describe('with attribute of type Composite', () => {
  const COMPOSITE_ATTRIBUTES = [
    { type: 'Text', code: 'myText' },
    { type: 'Number', code: 'myNumber' },
  ];
  let component;

  beforeEach(() => {
    component = getFormInstance({
      type: 'Composite',
      code: 'myComposite',
      compositeAttributes: COMPOSITE_ATTRIBUTES,
    });
  });

  it('renders a FormSection for the attribute', () => {
    expect(component.find('FormSection[name="myComposite"]')).toExist();
  });

  it('renders a Field for each child attribute', () => {
    COMPOSITE_ATTRIBUTES.forEach((attr) => {
      expect(component.find(`Field[name="${attr.code}"]`)).toExist();
    });
  });
});

describe('with validation rules', () => {
  it('when the message key is provided', () => {
    const component = getFormInstance({
      type: 'Text',
      code: 'myText',
      validationRules: { ognlValidation: { keyForHelpMessage: 'app.myKey' } },
    });

    expect(component.find('Field[name="myText"]')).toExist();
  });

  it('when the message text is provided', () => {
    const component = getFormInstance({
      type: 'Text',
      code: 'myText',
      validationRules: { ognlValidation: { helpMessage: 'My help message' } },
    });

    expect(component.find('Field[name="myText"]')).toExist();
  });
});
