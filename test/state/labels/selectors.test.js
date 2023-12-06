
import { getLabels, getLabelsIdList, getLabelsList, getLabelsMap, getLabelFilters, getSelectedLabel, getSearchTerm } from 'state/labels/selectors';


const LABELS_MAP = {
  HELLO: {
    key: 'HELLO',
    titles: {
      en: 'Hello',
      it: 'Ciao',
    },
  },
  GOODBYE: {
    key: 'GOODBYE',
    titles: {
      en: 'Goodbye',
      it: 'Addio',
    },
  },
};
const LABELS_LIST = [
  'HELLO',
  'GOODBYE',
];
const SEARCH_TERM = 'term';
const STATE = {
  labels: {
    map: LABELS_MAP,
    list: LABELS_LIST,
    filters: { keyword: 'testkey' },
    selected: LABELS_MAP.HELLO,
    searchTerm: SEARCH_TERM,
  },
};


describe('state/labels/selectors', () => {
  it('getLabels returns the labels state', () => {
    expect(getLabels(STATE)).toEqual(STATE.labels);
  });

  it('getSelectedLabel returns the selected label', () => {
    expect(getSelectedLabel(STATE)).toEqual(STATE.labels.selected);
  });

  it('getSearchTerm returns the search term value', () => {
    expect(getSearchTerm(STATE)).toEqual(SEARCH_TERM);
  });

  it('getLabelsIdList returns the labels id list', () => {
    expect(getLabelsIdList(STATE)).toEqual(STATE.labels.list);
  });

  it('getLabelsMap returns the labels map', () => {
    expect(getLabelsMap(STATE)).toEqual(STATE.labels.map);
  });

  it('getLabelsList returns the labels list', () => {
    expect(getLabelsList(STATE)).toEqual([
      LABELS_MAP.HELLO,
      LABELS_MAP.GOODBYE,
    ]);
  });

  it('getLabelFilters returns the label filters', () => {
    expect(getLabelFilters(STATE)).toEqual(STATE.labels.filters);
  });
});
