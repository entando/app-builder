import {
  mapStateToProps,
  mapDispatchToProps,
} from 'ui/edit-content/content-attributes/ContentAttributesContainer';

const state = {
  contentType: {
    selected: {
      attributes: [
        { code: 'Title', type: 'Text' },
      ],
    },
  },
  languages: {
    map: {
      it: {
        code: 'it',
        description: 'Italiano',
        isActive: false,
        isDefault: false,
      },
      en: {
        code: 'en',
        description: 'English',
        isActive: true,
        isDefault: true,
      },
    },
    list: ['it', 'en'],
  },
  contents: {
    selected: {
      attributes: [
        { code: 'Title', value: 'Test title' },
      ],
    },
  },
};

describe('edit-content/content-attributes/ContentAttributesContainer', () => {
  it('mapStateToProps should return correct object', () => {
    const props = mapStateToProps(state, { attributes: [{ code: 'Title', value: 'Test title' }] });
    const expectedState = [{
      code: 'Title',
      type: 'Text',
      value: 'Test title',
    }];
    expect(props).toHaveProperty('attributes', expectedState);
  });

  it('mapDispatchToProps should return correct object with functions that call dispatch', () => {
    const dispatchMock = jest.fn();
    const props = mapDispatchToProps(dispatchMock, { typeCode: 'TES' });
    expect(props).toHaveProperty('onDidMount');
    props.onDidMount();
    expect(dispatchMock).toHaveBeenCalled();
  });
});
