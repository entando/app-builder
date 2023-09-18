import React from 'react';
import UserProfileForm from 'ui/user-profile/common/UserProfileForm';
import { mockIntl } from 'test/legacyTestUtils';
import { renderWithIntl } from 'test/testUtils';
import '@testing-library/jest-dom/extend-expect';


const onSubmit = jest.fn();
const handleSubmit = jest.fn();
const onWillMount = jest.fn();
const invalid = false;
const submitting = false;
const defaultLanguage = 'en';
const languages = [{ code: 'en', name: 'English' }, { code: 'it', name: 'Italian' }];
const profileTypesAttributes = [];

beforeEach(jest.clearAllMocks);

describe('UserProfileForm', () => {
  it('renders without crashing', () => {
    const { getByTestId } = renderWithIntl(<UserProfileForm
      onSubmit={onSubmit}
      onWillMount={onWillMount}
      handleSubmit={handleSubmit}
      invalid={invalid}
      submitting={submitting}
      defaultLanguage={defaultLanguage}
      languages={languages}
      profileTypesAttributes={profileTypesAttributes}
      intl={mockIntl}
    />);
    expect(getByTestId('UserProfileForm')).toBeInTheDocument();
  });
});


const getFormInstance = attributes => renderWithIntl(<UserProfileForm
  onSubmit={onSubmit}
  onWillMount={onWillMount}
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
    it('renders a field for the attribute', () => {
      const { container } = getFormInstance(attribute);
      expect(container.querySelector(`[for=${attribute.code}], [name=${attribute.code}]`)).not.toBe(null);
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
  let container;
  beforeEach(() => {
    ({ container } = getFormInstance({
      type: 'Enumerator',
      code: 'myEnumerator',
      enumeratorStaticItems: 'pippo,pluto,paperino',
      enumeratorStaticItemsSeparator: ',',
      mandatory: true,
    }));
  });

  it('renders a Field for the attribute', () => {
    expect(container.querySelector('[name="myEnumerator"]')).toBeTruthy();
  });

  it('passes an option for each item', () => {
    const options = container.querySelectorAll('[name="myEnumerator"] option');
    expect(options.length).toBe(3);
  });
});

describe('with attribute of type Enumerator (NOT mandatory)', () => {
  let container;
  beforeEach(() => {
    ({ container } = getFormInstance({
      type: 'Enumerator',
      code: 'myEnumerator',
      enumeratorStaticItems: 'pippo,pluto,paperino',
      enumeratorStaticItemsSeparator: ',',
      mandatory: false,
    }));
  });

  it('renders a Field for the attribute', () => {
    expect(container.querySelector('[name="myEnumerator"]')).toBeTruthy();
  });

  it('passes an option for each item, plus one empty', () => {
    const options = container.querySelectorAll('[name="myEnumerator"] option');
    expect(options.length).toBe(4);
  });
});

describe('with attribute of type Monolist', () => {
  let container;
  beforeEach(() => {
    ({ container } = getFormInstance({
      type: 'Monolist',
      code: 'myMonolist',
      nestedAttribute: { type: 'Text', code: 'myText' },
    }));
  });

  it('renders a FieldArray for the attribute', () => {
    expect(container.querySelector('[name="myMonolist"]')).toBeTruthy();
  });
});


xdescribe('with attribute of type List', () => {
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


xdescribe('with attribute of type Composite', () => {
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
});

xdescribe('with validation rules', () => {
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
