
import { zeroFill, getComponentType, getPayloadForForm } from 'helpers/entities';


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

  let formAttr;

  const expectCommonProps = (attr) => {
    expect(attr).toHaveProperty('id', USERNAME);
    expect(attr).toHaveProperty('typeCode', USER_PROFILE.typeCode);
    expect(attr).toHaveProperty('typeDescription', USER_PROFILE.typeDescription);
  };


  describe('simplest use case (no attributes)', () => {
    beforeEach(() => {
      formAttr = getPayloadForForm(USERNAME, USER_PROFILE);
    });

    it('returns prop id = username', () => {
      expect(formAttr).toHaveProperty('id', USERNAME);
    });

    it('returns prop typeCode = the user profile typeCode', () => {
      expect(formAttr).toHaveProperty('typeCode', USER_PROFILE.typeCode);
    });

    it('returns prop typeDescription = the user profile typeDescription', () => {
      expect(formAttr).toHaveProperty('typeDescription', USER_PROFILE.typeDescription);
    });
  });

  describe('with Boolean attribute', () => {
    const ATTR_CODE = 'isActive';
    const ATTR_TYPE = 'Boolean';

    it('if attr value is populated, returns prop [code]: attribute value (string)', () => {
      formAttr = getPayloadForForm(
        USERNAME,
        {
          ...USER_PROFILE,
          attributes: [{ code: ATTR_CODE, value: true }],
        },
        [{ type: ATTR_TYPE, code: ATTR_CODE }],
        DEFAULT_LANGUAGE,
      );
      expectCommonProps(formAttr);
      expect(formAttr).toHaveProperty(ATTR_CODE, 'true');
    });

    it('if attr value is not populated, returns prop [code]: null', () => {
      formAttr = getPayloadForForm(
        USERNAME,
        {
          ...USER_PROFILE,
          attributes: [{ code: ATTR_CODE }],
        },
        [{ type: ATTR_TYPE, code: ATTR_CODE }],
        DEFAULT_LANGUAGE,
      );
      expectCommonProps(formAttr);
      expect(formAttr).toHaveProperty(ATTR_CODE, null);
    });
  });

  describe('with ThreeState attribute', () => {
    const ATTR_CODE = 'isActive';
    const ATTR_TYPE = 'ThreeState';

    it('if attr value is populated, returns prop [code]: attribute value (string)', () => {
      formAttr = getPayloadForForm(
        USERNAME,
        {
          ...USER_PROFILE,
          attributes: [{ code: ATTR_CODE, value: true }],
        },
        [{ type: ATTR_TYPE, code: ATTR_CODE }],
        DEFAULT_LANGUAGE,
      );
      expectCommonProps(formAttr);
      expect(formAttr).toHaveProperty(ATTR_CODE, 'true');
    });

    it('if attr value is not populated, returns prop [code]: null', () => {
      formAttr = getPayloadForForm(
        USERNAME,
        {
          ...USER_PROFILE,
          attributes: [{ code: ATTR_CODE }],
        },
        [{ type: ATTR_TYPE, code: ATTR_CODE }],
        DEFAULT_LANGUAGE,
      );
      expectCommonProps(formAttr);
      expect(formAttr).toHaveProperty(ATTR_CODE, null);
    });
  });

  describe('with Date attribute', () => {
    const ATTR_CODE = 'birthDate';
    const ATTR_TYPE = 'Date';

    it('returns prop [code]: date formatted in DD/MM/YYYY', () => {
      formAttr = getPayloadForForm(
        USERNAME,
        {
          ...USER_PROFILE,
          attributes: [{ code: ATTR_CODE, value: '1889-04-20 06:06:06' }],
        },
        [{ type: ATTR_TYPE, code: ATTR_CODE }],
        DEFAULT_LANGUAGE,
      );
      expectCommonProps(formAttr);
      expect(formAttr).toHaveProperty(ATTR_CODE, '20/04/1889');
    });
  });

  describe('with Timestamp attribute', () => {
    const ATTR_CODE = 'created';
    const ATTR_TYPE = 'Timestamp';

    it('returns prop [code]: date formatted in DD/MM/YYYY, and zero-padded time props', () => {
      formAttr = getPayloadForForm(
        USERNAME,
        {
          ...USER_PROFILE,
          attributes: [{ code: ATTR_CODE, value: '1889-04-20 03:06:09' }],
        },
        [{ type: ATTR_TYPE, code: ATTR_CODE }],
        DEFAULT_LANGUAGE,
      );
      expectCommonProps(formAttr);
      expect(formAttr).toHaveProperty(ATTR_CODE, '20/04/1889');
      expect(formAttr).toHaveProperty('created_ts_hours', '03');
      expect(formAttr).toHaveProperty('created_ts_minutes', '06');
      expect(formAttr).toHaveProperty('created_ts_seconds', '09');
    });
  });

  describe('with Hypertext attribute', () => {
    const ATTR_CODE = 'description';
    const ATTR_TYPE = 'Hypertext';

    it('returns prop [code]: the text in the default language', () => {
      formAttr = getPayloadForForm(
        USERNAME,
        {
          ...USER_PROFILE,
          attributes: [{ code: ATTR_CODE, values: { en: 'some text' } }], // FIXME values
        },
        [{ type: ATTR_TYPE, code: ATTR_CODE }],
        DEFAULT_LANGUAGE,
      );
      expectCommonProps(formAttr);
      expect(formAttr).toHaveProperty(ATTR_CODE, 'some text');
    });
  });

  describe('with Longtext attribute', () => {
    const ATTR_CODE = 'description';
    const ATTR_TYPE = 'Longtext';

    it('returns prop [code]: the text in the default language', () => {
      formAttr = getPayloadForForm(
        USERNAME,
        {
          ...USER_PROFILE,
          attributes: [{ code: ATTR_CODE, values: { en: 'some text' } }], // FIXME values
        },
        [{ type: ATTR_TYPE, code: ATTR_CODE }],
        DEFAULT_LANGUAGE,
      );
      expectCommonProps(formAttr);
      expect(formAttr).toHaveProperty(ATTR_CODE, 'some text');
    });
  });

  describe('with Text attribute', () => {
    const ATTR_CODE = 'description';
    const ATTR_TYPE = 'Text';

    it('returns prop [code]: the text in the default language', () => {
      formAttr = getPayloadForForm(
        USERNAME,
        {
          ...USER_PROFILE,
          attributes: [{ code: ATTR_CODE, values: { en: 'some text' } }], // FIXME values
        },
        [{ type: ATTR_TYPE, code: ATTR_CODE }],
        DEFAULT_LANGUAGE,
      );
      expectCommonProps(formAttr);
      expect(formAttr).toHaveProperty(ATTR_CODE, 'some text');
    });
  });

  describe('with Monolist attribute', () => {
    const ATTR_CODE = 'groups';
    const ATTR_TYPE = 'Monolist';
    const CHILD_TYPE = 'Boolean';

    it('returns prop [code]: an array of parsed children values', () => {
      formAttr = getPayloadForForm(
        USERNAME,
        {
          ...USER_PROFILE,
          attributes: [
            {
              code: ATTR_CODE,
              elements: [
                {
                  code: ATTR_CODE,
                  value: true,
                },
                {
                  code: ATTR_CODE,
                  value: false,
                },
              ],
            }],
        },
        [{
          type: ATTR_TYPE,
          code: ATTR_CODE,
          nestedAttribute: { code: ATTR_CODE, type: CHILD_TYPE },
        }],
        DEFAULT_LANGUAGE,
      );
      expectCommonProps(formAttr);
      expect(formAttr).toHaveProperty(ATTR_CODE, ['true', 'false']);
    });
  });

  describe('with List attribute', () => {
    const ATTR_CODE = 'multilist';
    const ATTR_TYPE = 'List';

    it('returns prop [code]: an array of parsed children values', () => {
      formAttr = getPayloadForForm(
        USERNAME,
        {
          ...USER_PROFILE,
          attributes: [
            {
              code: ATTR_CODE,
              listElements: {
                en: [{ code: ATTR_CODE, value: 'goofy' }],
                it: [{ code: ATTR_CODE, value: 'pippo' }, { code: ATTR_CODE, value: 'pluto' }],
              },
            }],
        },
        [{
          type: ATTR_TYPE,
          code: ATTR_CODE,
        }],
        DEFAULT_LANGUAGE,
      );
      expectCommonProps(formAttr);
      expect(formAttr).toHaveProperty(ATTR_CODE, { en: ['goofy'], it: ['pippo', 'pluto'] });
    });
  });

  describe('with Composite attribute', () => {
    const ATTR_CODE = 'address';
    const ATTR_TYPE = 'Composite';

    it('returns prop [code]: an object of parsed children values', () => {
      formAttr = getPayloadForForm(
        USERNAME,
        {
          ...USER_PROFILE,
          attributes: [
            {
              code: ATTR_CODE,
              elements: [
                {
                  code: 'textChild',
                  values: { [DEFAULT_LANGUAGE]: 'random text' },
                },
                {
                  code: 'booleanChild',
                  value: false,
                },
              ],
            }],
        },
        [{
          type: ATTR_TYPE,
          code: ATTR_CODE,
          compositeAttributes: [
            { code: 'textChild', type: 'Text' },
            { code: 'booleanChild', type: 'Boolean' },
          ],
        }],
        DEFAULT_LANGUAGE,
      );
      expectCommonProps(formAttr);
      expect(formAttr).toHaveProperty(ATTR_CODE);
      expect(formAttr[ATTR_CODE]).toHaveProperty('textChild', 'random text');
      expect(formAttr[ATTR_CODE]).toHaveProperty('booleanChild', 'false');
    });
  });
});
