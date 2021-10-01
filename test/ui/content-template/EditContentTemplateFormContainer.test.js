import {
  mapStateToProps,
  mapDispatchToProps,
} from 'ui/content-template/EditContentTemplateFormContainer';

const toMap = array => array.reduce((acc, contentType) => {
  acc[contentType.code] = contentType;
  return acc;
}, {});

const toIdList = array => array.map(contentType => contentType.code);

const contType = [
  {
    code: 'WEh',
    name: 'yo',
  },
  {
    code: 'MOO',
    name: 'to',
  },
];

const list = toIdList(contType);
const map = toMap(contType);

const state = {
  apps: {
    cms: {
      contentType: {
        map,
        list,
      },
      contentTemplate: {
        opened: {
          id: 1,
          contentType: 'WEh',
          descr: 'b',
        },
        dictionary: {
          list: [],
        },
      },
    },
  },
};

describe('content-template/EditContentTemplateFormContainer', () => {
  it('maps stateprops property', () => {
    const props = mapStateToProps(state);
    expect(props).toHaveProperty('contentTypes');
    expect(props).toHaveProperty('mode');
    expect(props.mode).toBe('edit');
  });

  it('maps dispatch property', () => {
    const props = mapDispatchToProps({}, { intl: {}, history: {}, match: { params: 1 } });
    expect(props).toHaveProperty('onSubmit');
    expect(props).toHaveProperty('onDidMount');
  });
});
