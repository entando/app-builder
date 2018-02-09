import reducer from 'state/rootReducer';
import pluginArray from 'entando-plugins';


describe('test plugins in rootReducer', () => {
  it('verify if reducer object plugin is structurally correct', () => {
    const state = reducer();
    expect(state.plugins).toBeDefined();
    pluginArray.forEach((plugin) => {
      expect(state.plugins[plugin.id]).toBeDefined();
    });
  });
});
