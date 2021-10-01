import { mapStateToProps, mapDispatchToProps } from 'ui/content-template/AddContentTemplateFormContainer';

const state = {
  apps: {
    cms: {
      contentType: {
        list: [],
      },
      contentTemplate: {
        dictionary: {
          list: [],
        },
      },
    },
  },
};

describe('content-template/AddContentTemplateFormContainer', () => {
  it('maps stateprops property', () => {
    const props = mapStateToProps(state);
    expect(props).toHaveProperty('contentTypes');
  });

  it('maps dispatch property', () => {
    const props = mapDispatchToProps({}, { intl: {}, history: {} });
    expect(props).toHaveProperty('onSubmit');
    expect(props).toHaveProperty('onDidMount');
  });
});
