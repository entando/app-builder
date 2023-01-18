import {
  getContentTemplateList,
  getContentTemplateFilterProps,
} from 'state/content-template/selectors';

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

it('verify getContentTemplateFilterProps selector', () => {
  const filtProps = getContentTemplateFilterProps(TEST_STATE);
  expect(filtProps).toBeDefined();
  expect(filtProps).toEqual(TEST_STATE.contentTemplate.filters.filterProps);
});
