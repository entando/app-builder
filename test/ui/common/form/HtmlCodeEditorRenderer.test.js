
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import HtmlCodeEditorRenderer from 'ui/common/form/HtmlCodeEditorRenderer';

const LABEL = 'Html code';
const HELP = 'Html help';
const ERROR_TEXT = 'There is an error!';
const VALUE = '<html />';
const onChange = jest.fn();
const onBlur = jest.fn();
const onFocus = jest.fn();

const INPUT = {
  value: VALUE,
  onChange,
  onBlur,
  onFocus,
};

const codeMirrorInstance = {
  doc: {
    getValue: jest.fn(() => VALUE),
  },
};

describe('HtmlCodeEditorRenderer', () => {
  beforeEach(jest.clearAllMocks);

  let component;
  let editor;

  describe('basic rendering', () => {
    beforeEach(() => {
      component = shallow((
        <HtmlCodeEditorRenderer
          input={INPUT}
          label={LABEL}
          help={HELP}
        />
      ));
      editor = component.find('UnControlled');
    });

    it('renders the label component', () => {
      expect(component.contains(LABEL)).toBe(true);
    });

    it('renders the help component', () => {
      expect(component.contains(HELP)).toBe(true);
    });

    it('renders a CodeMirror UnControlled editor', () => {
      expect(editor.exists()).toBe(true);
    });

    describe('editor', () => {
      it('shows line numbers', () => {
        expect(editor.prop('options')).toHaveProperty('lineNumbers', true);
      });

      it('highlights active line', () => {
        expect(editor.prop('options')).toHaveProperty('styleActiveLine', true);
      });

      it('highlights HTML syntax', () => {
        expect(editor.prop('options')).toHaveProperty('mode', 'htmlembedded');
      });

      it('keeps cursor position when value changes', () => {
        expect(editor.prop('autoCursor')).toBe(false);
      });

      it('shows the input.value', () => {
        expect(editor.prop('value')).toEqual(INPUT.value);
      });

      it('on change, updates redux-form', () => {
        const editorOnChange = editor.prop('onChange');
        editorOnChange({}, {}, INPUT.value);
        expect(onChange).toHaveBeenCalledWith(INPUT.value);
      });

      it('on blur, updates redux-form', () => {
        const editorOnBlur = editor.prop('onBlur');
        editorOnBlur(codeMirrorInstance);
        expect(onBlur).toHaveBeenCalledWith(VALUE);
      });

      it('on focus, updates redux-form', () => {
        const editorOnFocus = editor.prop('onFocus');
        editorOnFocus(codeMirrorInstance);
        expect(onFocus).toHaveBeenCalledWith(VALUE);
      });
    });
  });

  describe('if there is an error and the field is untouched', () => {
    beforeEach(() => {
      component = shallow((
        <HtmlCodeEditorRenderer
          input={INPUT}
          meta={{
            error: ERROR_TEXT,
            touched: false,
          }}
        />
      ));
      editor = component.find('UnControlled');
    });

    it('does not render the error', () => {
      expect(component.contains(ERROR_TEXT)).toBe(false);
    });
  });

  describe('if there is no error and the field is touched', () => {
    beforeEach(() => {
      component = shallow((
        <HtmlCodeEditorRenderer
          input={INPUT}
          meta={{
            error: '',
            touched: true,
          }}
        />
      ));
      editor = component.find('UnControlled');
    });

    it('does not render the error', () => {
      expect(component.contains(ERROR_TEXT)).toBe(false);
    });
  });

  describe('if there is an error and the field is touched', () => {
    beforeEach(() => {
      component = shallow((
        <HtmlCodeEditorRenderer
          input={INPUT}
          meta={{
            error: ERROR_TEXT,
            touched: true,
          }}
        />
      ));
      editor = component.find('UnControlled');
    });

    it('does render the error', () => {
      expect(component.contains(ERROR_TEXT)).toBe(true);
    });
  });
});
