import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import ReactQuill, { Quill } from 'react-quill-2';
import 'react-quill-2/dist/quill.snow.css';

import EditorToolbar from 'ui/common/rich-text-editor/EditorToolbar';
import SpecialCharSelectorModal from 'ui/common/rich-text-editor/SpecialCharSelectorModal';

const BlockEmbed = Quill.import('blots/block/embed');

function DividerBlot(...args) {
  return Reflect.construct(BlockEmbed, args, DividerBlot);
}
Object.setPrototypeOf(DividerBlot.prototype, BlockEmbed.prototype);
Object.setPrototypeOf(DividerBlot, BlockEmbed);
DividerBlot.blotName = 'divider';
DividerBlot.tagName = 'hr';

Quill.register(DividerBlot);

function history(value) {
  if (value === 'undo') {
    this.quill.history.undo();
  } else {
    this.quill.history.redo();
  }
}

function divider() {
  const range = this.quill.getSelection();
  if (range) {
    this.quill.insertEmbed(range.index, 'divider', 'null');
  }
}

function maximize() {
  const blockElementClass = 'RenderRichTextEditor__content';
  const quillbasis = this.quill.container;
  const editorContainer = quillbasis.closest(`.${blockElementClass}`);
  editorContainer.classList.toggle(`${blockElementClass}--maximize`);
  document.body.classList.toggle('no-scroll');
}

function entable(value) {
  const table = this.quill.getModule('table');
  const rows = 2;
  const cols = 2;
  switch (value) {
    case 'table':
      table.insertTable(rows, cols);
      break;
    case 'table-insert-row':
      table.insertRow();
      break;
    case 'table-insert-column':
      table.insertColumn();
      break;
    case 'table-delete-row':
      table.deleteRow();
      break;
    case 'table-delete-column':
      table.deleteColumn();
      break;
    case 'table-delete':
      table.deleteTable();
      break;
    default:
  }
}

class RichTextEditor extends Component {
  constructor() {
    super();

    this.state = {
      modal: '',
      editorToolbarId: 'editor-toolbar',
      editorCanWrite: false,
    };
    this.reactQuill = createRef();
    this.quill = null;

    this.txtArea = document.createElement('textarea');
    this.txtArea.classList.add('html-editor');
    this.txtArea.style.display = 'none';

    this.formats = [
      'bold',
      'italic',
      'strike',
      'clean',
      'list',
      'indent',
      'blockquote',
      'link',
      'table',
    ];

    this.handleLinkConfigSave = this.handleLinkConfigSave.bind(this);
    this.handleInsertSpecialChar = this.handleInsertSpecialChar.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    const { attrCode, langCode } = this.props;

    if (this.attachQuillRefs()) {
      this.handlers = {
        enlink: this.enlinkHandler.bind(this),
        entable,
        divider,
        specialChar: this.specialCharHandler.bind(this),
        history,
        maximize,
        viewSource: this.handleViewSource.bind(this),
      };
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ editorToolbarId: `editor-toolbar_${langCode}_${attrCode}` });
      this.timeout = window.setTimeout(() => this.setState({ editorCanWrite: true }), 100);
    }
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  get modules() {
    const { editorToolbarId } = this.state;
    const mods = {
      toolbar: {
        container: `#${editorToolbarId}`,
        handlers: this.handlers,
      },
      table: true,
    };
    return mods;
  }

  attachQuillRefs() {
    if (typeof this.reactQuill.current.getEditor !== 'function') return false;
    this.quill = this.reactQuill.current.getEditor();
    const { input: { name } } = this.props;
    this.quill.id = name;
    const quillCont = this.quill.container;
    const htmlEditor = quillCont.querySelector('.ql-custom') || this.quill.addContainer('ql-custom');
    htmlEditor.appendChild(this.txtArea);
    return true;
  }

  handleLinkConfigSave(values) {
    this.handleModalClose();
    const { url } = values;
    this.quill.format('link', url);
  }

  handleInsertSpecialChar(char) {
    this.handleModalClose();
    const cursor = this.quill.getSelection().index;
    this.quill.insertText(cursor, char);

    // circumvents inconsistent selection updates
    setTimeout(() => {
      this.quill.focus();
      this.quill.setSelection(cursor + 1);
    }, 0);
  }

  handleModalClose() {
    this.setState({
      modal: '',
    });
  }

  enlinkHandler(value) {
    const selection = this.quill.getSelection();
    if (value === 'link' && selection && selection.length >= 1) {
      this.setState({
        modal: 'enlink',
      });
    } else {
      this.quill.format('link', false);
    }
  }

  specialCharHandler() {
    this.setState({
      modal: 'specialChar',
    });
  }

  handleOnChange(content) {
    const { input } = this.props;
    input.onChange(content);
    const myEditor = this.quill.container.querySelector('.ql-editor');
    const html = myEditor.innerHTML;
    this.txtArea.value = html;
  }

  handleViewSource() {
    if (this.txtArea.style.display === '') {
      const html = this.txtArea.value;
      this.quill.clipboard.dangerouslyPasteHTML(html);
    }
    this.txtArea.style.display = this.txtArea.style.display === 'none' ? '' : 'none';
  }

  render() {
    const {
      placeholder, disabled, input, extraOptions,
    } = this.props;

    const { modal, editorToolbarId, editorCanWrite } = this.state;

    return (
      <div>
        <EditorToolbar name={editorToolbarId} extraOptions={extraOptions} />
        <ReactQuill
          {...input}
          ref={this.reactQuill}
          onBlur={(_, __, editor) => input.onBlur(editor.getHTML())}
          onChange={this.handleOnChange}
          placeholder={placeholder}
          disabled={disabled}
          modules={this.modules}
          formats={this.formats}
          readOnly={!editorCanWrite}
        />
        <SpecialCharSelectorModal
          isVisible={modal === 'specialChar'}
          onSelect={this.handleInsertSpecialChar}
          onClose={this.handleModalClose}
        />
      </div>
    );
  }
}

RichTextEditor.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
  }).isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  attrCode: PropTypes.string,
  langCode: PropTypes.string,
  mainGroup: PropTypes.string,
  joinGroups: PropTypes.arrayOf(PropTypes.string),
  extraOptions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

RichTextEditor.defaultProps = {
  placeholder: '',
  disabled: false,
  attrCode: '',
  langCode: 'en',
  mainGroup: '',
  joinGroups: [],
  extraOptions: null,
};

export default RichTextEditor;
