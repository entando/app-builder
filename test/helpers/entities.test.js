
import { zeroFill, getComponentType, getPayloadForForm, getPayloadForApi } from 'helpers/entities';


// fake values to easily test getComponentType mapping
jest.mock('ui/common/form/SwitchRenderer', () => 'SwitchRenderer');
jest.mock('ui/common/form/RenderDatePickerInput', () => 'RenderDatePickerInput');
jest.mock('ui/common/form/RenderTextAreaInput', () => 'RenderTextAreaInput');
jest.mock('ui/common/form/RenderDateTimePickerInput', () => 'RenderDateTimePickerInput');
jest.mock('ui/common/form/RenderRadioInput', () => 'RenderRadioInput');
jest.mock('ui/common/form/RenderSelectInput', () => 'RenderSelectInput');
jest.mock('ui/common/form/RenderTextInput', () => 'RenderTextInput');

describe('getComponentType', () => {
  const componentMapping = {
    Boolean: 'RenderRadioInput',
    ThreeState: 'RenderRadioInput',
    CheckBox: 'SwitchRenderer',
    Date: 'RenderDatePickerInput',
    Timestamp: 'RenderDateTimePickerInput',
    Longtext: 'RenderTextAreaInput',
    Hypertext: 'RenderTextAreaInput',
    Enumerator: 'RenderSelectInput',
    EnumeratorMap: 'RenderSelectInput',
  };

  it('for each data type, returns the correct component', () => {
    Object.keys(componentMapping).forEach((key) => {
      expect(getComponentType(key)).toBe(componentMapping[key]);
    });
  });

  it('for not mapped data types, returns RenderTextInput component', () => {
    expect(getComponentType('someRandomType')).toBe('RenderTextInput');
  });
});


describe('zeroFill', () => {
  it('if number < 10, return a 2-digits, zero left-padded string representing the number', () => {
    expect(zeroFill(3)).toBe('03');
  });

  it('if number >= 10, returns the string representation of the number', () => {
    expect(zeroFill(10)).toBe('10');
    expect(zeroFill(12)).toBe('12');
    expect(zeroFill(333)).toBe('333');
  });
});


describe('getPayloadForForm', () => {
  const USERNAME = 'someUsername';
  const DEFAULT_LANGUAGE = 'en';
  const USER_PROFILE = {
    typeCode: 'someTypecode',
    typeDescription: 'someTypeDescription',
    attributes: [],
  };


  const testGetPayloadForm = (text, {
    attrType, attributes, profileType, testAssertions,
  }) => {
    describe(`with ${attrType} attribute`, () => {
      let formAttr;
      it(text, () => {
        formAttr = getPayloadForForm(
          USERNAME,
          {
            ...USER_PROFILE,
            attributes,
          },
          profileType,
          DEFAULT_LANGUAGE,
        );

        expect(formAttr).toHaveProperty('id', USERNAME);
        expect(formAttr).toHaveProperty('typeCode', USER_PROFILE.typeCode);
        expect(formAttr).toHaveProperty('typeDescription', USER_PROFILE.typeDescription);

        if (testAssertions) {
          testAssertions(formAttr);
        }
      });
    });
  };


  // no attributes

  testGetPayloadForm(
    'if no attribute provided, it will still return props: id, typeCode, typeDescription',
    {
      attrType: 'NO',
      attributes: [],
      profileType: [],
    },
  );

  // Boolean

  testGetPayloadForm(
    'if attr value is populated, returns prop [code]: attribute value (string)',
    {
      attrType: 'Boolean',
      attributes: [{ code: 'isActive', value: true }],
      profileType: [{ code: 'isActive', type: 'Boolean' }],
      testAssertions: (formAttr) => {
        expect(formAttr).toHaveProperty('isActive', 'true');
      },
    },
  );

  testGetPayloadForm(
    'if attr value is not populated, returns prop [code]: null',
    {
      attrType: 'Boolean',
      attributes: [{ code: 'isActive' }],
      profileType: [{ code: 'isActive', type: 'Boolean' }],
      testAssertions: (formAttr) => {
        expect(formAttr).toHaveProperty('isActive', null);
      },
    },
  );


  // ThreeState

  testGetPayloadForm(
    'if attr value is populated, returns prop [code]: attribute value (string)',
    {
      attrType: 'ThreeState',
      attributes: [{ code: 'isActive', value: true }],
      profileType: [{ code: 'isActive', type: 'ThreeState' }],
      testAssertions: (formAttr) => {
        expect(formAttr).toHaveProperty('isActive', 'true');
      },
    },
  );

  testGetPayloadForm(
    'if attr value is not populated, returns prop [code]: null',
    {
      attrType: 'ThreeState',
      attributes: [{ code: 'isActive' }],
      profileType: [{ code: 'isActive', type: 'ThreeState' }],
      testAssertions: (formAttr) => {
        expect(formAttr).toHaveProperty('isActive', null);
      },
    },
  );


  // Date

  testGetPayloadForm(
    'returns prop [code]: date formatted in DD/MM/YYYY',
    {
      attrType: 'Date',
      attributes: [{ code: 'birthDate', value: '1889-04-20 06:06:06' }],
      profileType: [{ code: 'birthDate', type: 'Date' }],
      testAssertions: (formAttr) => {
        expect(formAttr).toHaveProperty('birthDate', '20/04/1889');
      },
    },
  );


  // Timestamp

  testGetPayloadForm(
    'returns prop [code]: date formatted in DD/MM/YYYY, and zero-padded time props',
    {
      attrType: 'Timestamp',
      attributes: [{ code: 'created', value: '1889-04-20 03:06:09' }],
      profileType: [{ code: 'created', type: 'Timestamp' }],
      testAssertions: (formAttr) => {
        expect(formAttr).toHaveProperty('created', '20/04/1889');
        expect(formAttr).toHaveProperty('created_ts_hours', '03');
        expect(formAttr).toHaveProperty('created_ts_minutes', '06');
        expect(formAttr).toHaveProperty('created_ts_seconds', '09');
      },
    },
  );


  // Hypertext

  testGetPayloadForm(
    'returns prop [code]: the text in the default language',
    {
      attrType: 'Hypertext',
      attributes: [{ code: 'description', values: { [DEFAULT_LANGUAGE]: 'some text' } }],
      profileType: [{ code: 'description', type: 'Hypertext' }],
      testAssertions: (formAttr) => {
        expect(formAttr).toHaveProperty('description', 'some text');
      },
    },
  );


  // Longtext

  testGetPayloadForm(
    'returns prop [code]: the text in the default language',
    {
      attrType: 'Longtext',
      attributes: [{ code: 'description', values: { [DEFAULT_LANGUAGE]: 'some text' } }],
      profileType: [{ code: 'description', type: 'Longtext' }],
      testAssertions: (formAttr) => {
        expect(formAttr).toHaveProperty('description', 'some text');
      },
    },
  );


  // Text

  testGetPayloadForm(
    'returns prop [code]: the text in the default language',
    {
      attrType: 'Text',
      attributes: [{ code: 'description', values: { [DEFAULT_LANGUAGE]: 'some text' } }],
      profileType: [{ code: 'description', type: 'Text' }],
      testAssertions: (formAttr) => {
        expect(formAttr).toHaveProperty('description', 'some text');
      },
    },
  );


  // Monolist

  testGetPayloadForm(
    'returns prop [code]: an array of parsed children values',
    {
      attrType: 'Monolist',
      attributes: [
        {
          code: 'someList',
          elements: [
            { code: 'someList', value: true },
            { code: 'someList', value: false },
          ],
        },
      ],
      profileType: [{
        code: 'someList',
        type: 'Monolist',
        nestedAttribute: { code: 'someList', type: 'Boolean' },
      }],
      testAssertions: (formAttr) => {
        expect(formAttr).toHaveProperty('someList', ['true', 'false']);
      },
    },
  );


  // List

  testGetPayloadForm(
    'returns prop [code]: an array of parsed children values',
    {
      attrType: 'List',
      attributes: [
        {
          code: 'multilist',
          listElements: {
            en: [{ code: 'multilist', value: 'goofy' }],
            it: [{ code: 'multilist', value: 'pippo' }, { code: 'multilist', value: 'pluto' }],
          },
        },
      ],
      profileType: [{ code: 'multilist', type: 'List' }],
      testAssertions: (formAttr) => {
        expect(formAttr).toHaveProperty('multilist', { en: ['goofy'], it: ['pippo', 'pluto'] });
      },
    },
  );

  testGetPayloadForm(
    'if listElements is not provided, returns an empty object',
    {
      attrType: 'List',
      attributes: [{ code: 'multilist' },
      ],
      profileType: [{ code: 'multilist', type: 'List' }],
      testAssertions: (formAttr) => {
        expect(formAttr).toHaveProperty('multilist', {});
      },
    },
  );


  // Composite

  testGetPayloadForm(
    'returns prop [code]: an object of parsed children values',
    {
      attrType: 'Composite',
      attributes: [
        {
          code: 'someComposite',
          elements: [
            { code: 'textChild', values: { [DEFAULT_LANGUAGE]: 'random text' } },
            { code: 'booleanChild', value: false },
          ],
        },
      ],
      profileType: [{
        type: 'Composite',
        code: 'someComposite',
        compositeAttributes: [
          { code: 'textChild', type: 'Text' },
          { code: 'booleanChild', type: 'Boolean' },
        ],
      }],
      testAssertions: (formAttr) => {
        expect(formAttr).toHaveProperty('someComposite');
        expect(formAttr.someComposite).toHaveProperty('textChild', 'random text');
        expect(formAttr.someComposite).toHaveProperty('booleanChild', 'false');
      },
    },
  );


  // other types (default)

  testGetPayloadForm(
    'returns prop [code] = value',
    {
      attrType: 'another type',
      attributes: [{ code: 'someCode', value: 'hello123' }],
      profileType: [{ code: 'someCode', type: 'SomeRandomType' }],
      testAssertions: (formAttr) => {
        expect(formAttr).toHaveProperty('someCode', 'hello123');
      },
    },
  );
});


describe('getPayloadForApi', () => {
  const DEFAULT_LANGUAGE = 'en';
  const USER_PROFILE = {
    id: 'someUserName',
    typeCode: 'someTypecode',
    typeDescription: 'someTypeDescription',
  };


  const testGetPayloadForApi = (text, {
    attrType, attributes, profileType, testAssertions,
  }) => {
    describe(`with ${attrType} attribute`, () => {
      let formAttr;
      it(text, () => {
        formAttr = getPayloadForApi(
          { ...USER_PROFILE, ...attributes },
          profileType,
          DEFAULT_LANGUAGE,
        );

        expect(formAttr).toHaveProperty('id', USER_PROFILE.id);
        expect(formAttr).toHaveProperty('typeCode', USER_PROFILE.typeCode);
        expect(formAttr).toHaveProperty('typeDescription', USER_PROFILE.typeDescription);
        expect(formAttr).toHaveProperty('attributes');

        if (testAssertions) {
          testAssertions(formAttr);
        }
      });
    });
  };


  // no attributes

  testGetPayloadForApi(
    'if no attribute provided, it will still return: id, typeCode, typeDescription, attributes',
    {
      attrType: 'NO',
      attributes: { },
      profileType: [],
    },
  );

  // Boolean

  testGetPayloadForApi(
    'returns an attributes item with value = parsed value',
    {
      attrType: 'Boolean',
      attributes: { isActive: 'true' },
      profileType: [{ code: 'isActive', type: 'Boolean' }],
      testAssertions: (formAttr) => {
        const attribute = formAttr.attributes.find(attr => attr.code === 'isActive');
        expect(attribute).toHaveProperty('value', true);
      },
    },
  );

  testGetPayloadForApi(
    'if value is empty string, returns an attributes item with value = false',
    {
      attrType: 'Boolean',
      attributes: { isActive: '' },
      profileType: [{ code: 'isActive', type: 'Boolean' }],
      testAssertions: (formAttr) => {
        const attribute = formAttr.attributes.find(attr => attr.code === 'isActive');
        expect(attribute).toHaveProperty('value', false);
      },
    },
  );


  // ThreeState

  testGetPayloadForApi(
    'returns an attributes item with value = parsed value',
    {
      attrType: 'ThreeState',
      attributes: { isActive: 'true' },
      profileType: [{ code: 'isActive', type: 'ThreeState' }],
      testAssertions: (formAttr) => {
        const attribute = formAttr.attributes.find(attr => attr.code === 'isActive');
        expect(attribute).toHaveProperty('value', true);
      },
    },
  );

  testGetPayloadForApi(
    'if value is empty string, returns an attributes item with value = null',
    {
      attrType: 'ThreeState',
      attributes: { isActive: '' },
      profileType: [{ code: 'isActive', type: 'ThreeState' }],
      testAssertions: (formAttr) => {
        const attribute = formAttr.attributes.find(attr => attr.code === 'isActive');
        expect(attribute).toHaveProperty('value', null);
      },
    },
  );


  // Number

  testGetPayloadForApi(
    'returns an attributes item with value = parsed number',
    {
      attrType: 'Number',
      attributes: { myAttribute: '6' },
      profileType: [{ code: 'myAttribute', type: 'Number' }],
      testAssertions: (formAttr) => {
        const attribute = formAttr.attributes.find(attr => attr.code === 'myAttribute');
        expect(attribute).toHaveProperty('value', 6);
      },
    },
  );


  // Date

  testGetPayloadForApi(
    'returns a date in YYYY-MM-DD HH:mm:ss format',
    {
      attrType: 'Date',
      attributes: { myAttribute: '20/04/1889' },
      profileType: [{ code: 'myAttribute', type: 'Date' }],
      testAssertions: (formAttr) => {
        const attribute = formAttr.attributes.find(attr => attr.code === 'myAttribute');
        expect(attribute).toHaveProperty('value', '1889-04-20 00:00:00');
      },
    },
  );


  // Timestamp

  testGetPayloadForApi(
    'returns a date in YYYY-MM-DD HH:mm:ss format',
    {
      attrType: 'Timestamp',
      attributes: {
        myAttribute: '20/04/1889',
        myAttribute_ts_hours: '03',
        myAttribute_ts_minutes: '06',
        myAttribute_ts_seconds: '09',
      },
      profileType: [{ code: 'myAttribute', type: 'Timestamp' }],
      testAssertions: (formAttr) => {
        const attribute = formAttr.attributes.find(attr => attr.code === 'myAttribute');
        expect(attribute).toHaveProperty('value', '1889-04-20 03:06:09');
      },
    },
  );


  // Text

  testGetPayloadForApi(
    'returns an object with default language key',
    {
      attrType: 'Text',
      attributes: { myAttribute: 'pippo' },
      profileType: [{ code: 'myAttribute', type: 'Text' }],
      testAssertions: (formAttr) => {
        const attribute = formAttr.attributes.find(attr => attr.code === 'myAttribute');
        expect(attribute).toHaveProperty('values', { [DEFAULT_LANGUAGE]: 'pippo' });
      },
    },
  );


  // Longtext

  testGetPayloadForApi(
    'returns an object with default language key',
    {
      attrType: 'Longtext',
      attributes: { myAttribute: 'pippo' },
      profileType: [{ code: 'myAttribute', type: 'Longtext' }],
      testAssertions: (formAttr) => {
        const attribute = formAttr.attributes.find(attr => attr.code === 'myAttribute');
        expect(attribute).toHaveProperty('values', { [DEFAULT_LANGUAGE]: 'pippo' });
      },
    },
  );


  // Hypertext

  testGetPayloadForApi(
    'returns an object with default language key',
    {
      attrType: 'Hypertext',
      attributes: { myAttribute: 'pippo' },
      profileType: [{ code: 'myAttribute', type: 'Hypertext' }],
      testAssertions: (formAttr) => {
        const attribute = formAttr.attributes.find(attr => attr.code === 'myAttribute');
        expect(attribute).toHaveProperty('values', { [DEFAULT_LANGUAGE]: 'pippo' });
      },
    },
  );


  // Monolist

  testGetPayloadForApi(
    'returns an array of attributes of the same type',
    {
      attrType: 'Monolist',
      attributes: { myAttribute: ['true', 'false'] },
      profileType: [{
        code: 'myAttribute',
        type: 'Monolist',
        nestedAttribute: { code: 'myAttribute', type: 'Boolean' },
      }],
      testAssertions: (formAttr) => {
        const attribute = formAttr.attributes.find(attr => attr.code === 'myAttribute');
        expect(attribute).toHaveProperty('elements', [
          { code: 'myAttribute', value: true },
          { code: 'myAttribute', value: false },
        ]);
      },
    },
  );


  // List

  testGetPayloadForApi(
    'returns an object of language codes, mapping arrays of attributes',
    {
      attrType: 'List',
      attributes: { myAttribute: { en: ['goofy'], it: ['pippo', 'pluto'] } },
      profileType: [{ code: 'myAttribute', type: 'List' }],
      testAssertions: (formAttr) => {
        const attribute = formAttr.attributes.find(attr => attr.code === 'myAttribute');
        expect(attribute).toHaveProperty('listElements', {
          en: [{ code: 'myAttribute', value: 'goofy' }],
          it: [{ code: 'myAttribute', value: 'pippo' }, { code: 'myAttribute', value: 'pluto' }],
        });
      },
    },
  );


  // Composite

  testGetPayloadForApi(
    'returns an object with an elements property, which is an Array containing the children',
    {
      attrType: 'Composite',
      attributes: { myAttribute: { textChild: 'random text', booleanChild: true } },
      profileType: [{
        code: 'myAttribute',
        type: 'Composite',
        compositeAttributes: [
          { code: 'textChild', type: 'Text' },
          { code: 'booleanChild', type: 'Boolean' },
        ],
      }],
      testAssertions: (formAttr) => {
        const attribute = formAttr.attributes.find(attr => attr.code === 'myAttribute');
        expect(attribute).toHaveProperty('elements', [
          { code: 'textChild', values: { [DEFAULT_LANGUAGE]: 'random text' } },
          { code: 'booleanChild', value: false },
        ]);
      },
    },
  );


  // other types (default)

  testGetPayloadForApi(
    'returns an attribute with prop value = the attribute value',
    {
      attrType: 'another type',
      attributes: { myAttribute: 'some text' },
      profileType: [{ code: 'myAttribute', type: 'SomeRandomType' }],
      testAssertions: (formAttr) => {
        const attribute = formAttr.attributes.find(attr => attr.code === 'myAttribute');
        expect(attribute).toHaveProperty('value', 'some text');
      },
    },
  );
});
