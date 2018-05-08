
import { getLabels, getLabelsIdList, getLabelsList, getLabelsMap } from 'state/labels/selectors';


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
const STATE = {
  labels: {
    map: LABELS_MAP,
    list: LABELS_LIST,
  },
};


describe('state/labels/selectors', () => {
  it('getLabels returns the labels state', () => {
    expect(getLabels(STATE)).toEqual(STATE.labels);
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
});
