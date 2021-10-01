import reducer from 'state/content-settings/reducer';
import {
  setContentSettings,
  setEditorSettings,
  setCropRatios,
} from 'state/content-settings/actions';

describe('state/content-settings/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });

  it('after action SET_CONTENT_SETTINGS', () => {
    const settings = { hello: 1, editor: 2 };
    const state = reducer({}, setContentSettings(settings));
    expect(state).toHaveProperty('hello', 1);
    expect(state).toHaveProperty('editor', 2);
    expect(Object.keys(state)).toHaveLength(2);
  });

  it('after action SET_EDITOR_SETTINGS', () => {
    const editor = { key: 'buloy' };
    const state = reducer({}, setEditorSettings(editor));
    expect(state).toHaveProperty('editor', editor);
  });

  it('after action SET_CROP_RATIOS', () => {
    const cropRatios = ['4:9', '16:9'];
    const state = reducer({}, setCropRatios(cropRatios));
    expect(state).toHaveProperty('cropRatios', cropRatios);
  });
});
