import React from 'react';
import UserProfileForm from 'ui/user-profile/common/UserProfileForm';
import { mockIntl } from 'test/legacyTestUtils';
import { renderWithIntl } from 'test/testUtils';
import '@testing-library/jest-dom/extend-expect';


const onSubmit = jest.fn();
const handleSubmit = jest.fn();
const onDidMount = jest.fn();
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
      onDidMount={onDidMount}
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
  onDidMount={onDidMount}
  handleSubmit={handleSubmit}
  invalid={invalid}
  submitting={submitting}
  defaultLanguage={defaultLanguage}
  languages={languages}
  profileTypesAttributes={Array.isArray(attributes) ? attributes : [attributes]}
  userProfileAttributes={Array.isArray(attributes) ? attributes : [attributes]}
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

// not used scenario
xdescribe('with attribute of type Monolist', () => {
  let container;
  beforeEach(() => {
    ({ container } = getFormInstance([{
      type: 'Monolist',
      code: 'myMonolist',
      elements: [{ code: 'myMonoList', value: 'test' }, { code: 'myMonoList', value: 'test2' }],
      nestedAttribute: { type: 'Text', code: 'myText' },
    }]));
  });

  it('renders a FieldArray for the attribute', () => {
    expect(container.querySelector('input[name="myMonolist.0"]')).toBeTruthy();
  });
});

// not used scenario
xdescribe('with attribute of type List', () => {
  let container;
  beforeEach(() => {
    ({ container } = getFormInstance({
      type: 'List',
      code: 'myList',
      elements: [{ code: 'myList', value: 'test' }, { code: 'myList', value: 'test2' }],
      nestedAttribute: { type: 'Text', code: 'myText' },
    }));
  });

  it('renders a FieldArray for each language', () => {
    languages.forEach((langItem) => {
      expect(container.querySelectorAll(`[name="myList.${langItem.code}"]`)).toBeTruthy();
    });
  });
});

// not used scenario
xdescribe('with attribute of type Composite', () => {
  const COMPOSITE_ATTRIBUTES = [
    { type: 'Text', code: 'myText' },
    { type: 'Number', code: 'myNumber' },
  ];
  let container;

  beforeEach(() => {
    ({ container } = getFormInstance({
      type: 'Composite',
      code: 'myComposite',
      elements: [{ code: 'myComposite', value: 'test' }, { code: 'myComposite', value: 'test2' }],
      compositeAttributes: COMPOSITE_ATTRIBUTES,
    }));
  });

  it('renders a FormSection for the attribute', () => {
    expect(container.querySelector('[name="myComposite.0"]')).toBeTruthy();
  });
});

describe('with validation rules', () => {
  it('when the message key is provided', () => {
    const { container } = getFormInstance({
      type: 'Text',
      code: 'myText',
      validationRules: { ognlValidation: { keyForHelpMessage: 'app.myKey' } },
    });

    expect(container.querySelector('[name="myText"]')).toBeTruthy();
  });

  it('when the message text is provided', () => {
    const { container } = getFormInstance({
      type: 'Text',
      code: 'myText',
      validationRules: { ognlValidation: { helpMessage: 'My help message' } },
    });

    expect(container.querySelector('[name="myText"]')).toBeTruthy();
  });
});
