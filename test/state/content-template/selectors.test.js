import {
  getContentTemplateList,
  getContentTemplateOpened,
  getContentTemplateFilterProps,
  getContentTemplateSearchAttribute,
  getContentTemplateSearchKeyword,
  getContentTemplateDictionaryList,
} from 'state/content-template/selectors';

import { getShapeMethodsByAttributeType } from 'state/content-type/selectors';

const TEST_STATE = {
  contentType: {
    selected: {
      attributes: [
        { code: 'Title', type: 'Text' },
        { code: 'Subtitle', type: 'Text' },
      ],
    },
  },
  contentTemplate: {
    list: ['hello', 'world'],
    opened: { name: 'ciao', id: 1 },
    filters: {
      filterProps: {
        formValues: { descr: 'boger' },
        operators: { descr: 'like' },
      },
      attribute: 'descr',
      keyword: 'woo',
    },
    dictionary: {
      list: [
        {
          code: '$content',
          methods: { getId: null },
        },
        {
          code: 'lecode',
          methods: null,
        },
      ],
      map: { content: { getId: null } },
    },
  },
};

it('verify getContentTemplateList selector', () => {
  const state = getContentTemplateList(TEST_STATE);
  expect(state).toBeDefined();
  expect(state).toHaveLength(2);
});

it('verify getContentTemplateOpened selector', () => {
  const opened = getContentTemplateOpened(TEST_STATE);
  expect(opened).toBeDefined();
  expect(opened).toHaveProperty('name', 'ciao');
  expect(opened).toHaveProperty('id', 1);
});

it('verify getContentTemplateSearchKeyword selector', () => {
  const keyword = getContentTemplateSearchKeyword(TEST_STATE);
  expect(keyword).toBeDefined();
  expect(keyword).toEqual(TEST_STATE.contentTemplate.filters.keyword);
});

it('verify getContentTemplateSearchAttribute selector', () => {
  const attribute = getContentTemplateSearchAttribute(TEST_STATE);
  expect(attribute).toBeDefined();
  expect(attribute).toEqual(TEST_STATE.contentTemplate.filters.attribute);
});

it('verify getContentTemplateFilterProps selector', () => {
  const filtProps = getContentTemplateFilterProps(TEST_STATE);
  expect(filtProps).toBeDefined();
  expect(filtProps).toEqual(TEST_STATE.contentTemplate.filters.filterProps);
});

it('verify getContentTemplateDictionaryList selector', () => {
  const textMethods = getShapeMethodsByAttributeType('Text');
  const res = [
    {
      code: '$content',
      methods: {
        Title: textMethods,
        Subtitle: textMethods,
        getId: null,
      },
    },
    {
      code: 'lecode',
      methods: {},
    },
  ];
  const filtProps = getContentTemplateDictionaryList(TEST_STATE);
  expect(filtProps).toBeDefined();
  expect(filtProps).toEqual(res);
});
