import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import ace from 'brace';
import { Col, ControlLabel } from 'patternfly-react';

import 'brace/mode/html';
import 'brace/theme/tomorrow';
import 'brace/snippets/html';
import 'brace/ext/language_tools';

const langTools = ace.acequire('ace/ext/language_tools');
const tokenUtils = ace.acequire('ace/autocomplete/util');
const { textCompleter, keyWordCompleter, snippetCompleter } = langTools;
const defaultCompleters = [textCompleter, keyWordCompleter, snippetCompleter];

const escChars = term => term.replace('$', '\\$').replace('#', '\\#');
const isAttribFunction = term => /[a-zA-Z]+\([^)]*\)(\.[^)]*\))?/g.test(term);

const createSuggestionItem = (key, namespace, lvl = 0, meta = '') => ({
  caption: key,
  value: key,
  score: 10000 + lvl,
  meta: meta || `${namespace} Object ${isAttribFunction(key) ? 'Method' : 'Property'}`,
});

const aceOnBlur = onBlur => (_event, editor) => {
  if (editor) {
    const value = editor.getValue();
    onBlur(value);
  }
};

class RenderContentTemplateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: null,
      dictionaryLoaded: false,
      dictionary: [],
      dictList: [],
      dictMapped: {},
      contentTemplateCompleter: null,
    };
    this.onEditorLoaded = this.onEditorLoaded.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { dictionary } = this.props;
    if (dictionary !== prevProps.dictionary) {
      this.condenseRootDict();
    }
  }

  onEditorLoaded(editor) {
    this.setState({ editor });

    this.initCompleter();

    editor.commands.addCommand({
      name: 'dotCommandSubMethods',
      bindKey: { win: '.', mac: '.' },
      exec: () => {
        editor.insert('.');
        const { selection } = editor;
        const cursor = selection.getCursor();
        const extracted = this.extractCodeFromCursor(cursor);
        const { namespace } = extracted;
        if (!namespace) {
          this.enableRootSuggestions();
          return;
        }

        const [rootSpace, ...subSpace] = namespace.split('.');

        if (subSpace.length > 1) {
          this.enableRootSuggestions();
          return;
        }

        const verified = subSpace.length
          ? this.findTokenInDictMap(subSpace[0], rootSpace)
          : this.findTokenInDictMap(rootSpace);
        if (verified) {
          this.disableRootSuggestions();
        } else {
          this.enableRootSuggestions();
        }
        editor.execCommand('startAutocomplete');
      },
    });
  }

  disableRootSuggestions() {
    const { contentTemplateCompleter } = this.state;
    langTools.setCompleters([contentTemplateCompleter]);
  }

  enableRootSuggestions() {
    const { dictionary, contentTemplateCompleter } = this.state;
    langTools.setCompleters([...defaultCompleters, contentTemplateCompleter]);
    this.setState({
      dictList: [...dictionary],
    });
  }

  initCompleter() {
    const contentTemplateCompleter = {
      getCompletions: (
        _editor,
        session,
        cursor,
        prefix,
        callback,
      ) => {
        const extracted = this.extractCodeFromCursor(cursor, prefix);
        const { namespace } = extracted;
        if (!namespace) {
          this.enableRootSuggestions();
        } else {
          const [rootSpace, ...subSpace] = namespace.split('.');

          const verified = subSpace.length
            ? this.findTokenInDictMap(subSpace[0], rootSpace)
            : this.findTokenInDictMap(rootSpace);
          if (verified) {
            this.disableRootSuggestions();
            const { dictMapped } = this.state;
            if (verified.namespace) {
              const mappedToken = dictMapped[verified.namespace];
              const dictList = mappedToken[verified.term]
                .map(entry => createSuggestionItem(entry, verified.namespace, 2));
              this.setState({ dictList });
            } else {
              const mappedToken = dictMapped[verified.term];
              const dictList = Object.entries(mappedToken)
                .map(([entry]) => createSuggestionItem(entry, verified.term, 1));
              this.setState({ dictList });
            }
          } else {
            this.disableRootSuggestions();
          }
        }
        const { dictList } = this.state;
        callback(null, dictList);
      },
    };
    langTools.setCompleters([...defaultCompleters, contentTemplateCompleter]);
    this.setState({ contentTemplateCompleter });
  }

  condenseRootDict() {
    const { dictionary: _dict } = this.props;
    const dictMapped = _dict.reduce((acc, curr) => {
      acc[curr.code] = curr.methods;
      return acc;
    }, {});

    const dictionary = _dict.map(({ code }) => (
      createSuggestionItem(code, code, 0, `${code} Object`)
    ));

    this.setState({
      dictionary,
      dictMapped,
      dictList: [...dictionary],
      dictionaryLoaded: true,
    });
  }

  extractCodeFromCursor({ row, column }, prefixToken) {
    const { editor: { session } } = this.state;
    const codeline = (session.getDocument().getLine(row)).trim();
    const token = prefixToken || tokenUtils.retrievePrecedingIdentifier(codeline, column);
    const wholeToken = tokenUtils.retrievePrecedingIdentifier(
      codeline,
      column,
      /[.a-zA-Z_0-9$\-\u00A2-\uFFFF]/,
    );
    if (token === wholeToken) {
      return { token, namespace: '' };
    }
    const namespace = wholeToken.replace(/\.$/g, '');
    return { token, namespace };
  }

  findTokenInDictMap(token, parentToken) {
    const { dictMapped } = this.state;
    const findInDict = (term, dict) => (
      Object.keys(dict).find((key) => {
        const keyRegEx = new RegExp(`${escChars(key)}$`, 'g');
        return keyRegEx.test(term);
      })
    );
    if (!parentToken) {
      const term = findInDict(token, dictMapped);
      return term && { term };
    }
    const namespace = findInDict(parentToken, dictMapped);
    if (!namespace) {
      return false;
    }
    const term = findInDict(token, dictMapped[parentToken]);
    if (!term) return false;
    return { term, namespace };
  }

  render() {
    const {
      input, meta: { touched, error }, label, help,
      labelSize, inputSize, append, prepend, alignClass,
    } = this.props;
    const { dictionaryLoaded } = this.state;
    return (
      <div className={(touched && error) ? 'form-group has-error' : 'form-group'}>
        {
          labelSize > 0 ? (
            <Col xs={labelSize} className={alignClass}>
              <ControlLabel htmlFor={input.name}>
                {label} {help}
              </ControlLabel>
            </Col>
          ) : ''
        }
        <Col xs={inputSize || 12 - labelSize}>
          {prepend}
          {dictionaryLoaded && (
            <AceEditor
              mode="html"
              theme="tomorrow"
              width="100%"
              showPrintMargin={false}
              editorProps={{
                $blockScrolling: Infinity,
              }}
              setOptions={{
                useWorker: false,
              }}
              style={{ border: '1px solid #ddd' }}
              enableBasicAutocompletion
              enableLiveAutocompletion
              enableSnippets
              name={input.name}
              onBlur={aceOnBlur(input.onBlur)}
              onChange={input.onChange}
              onFocus={input.onFocus}
              onLoad={this.onEditorLoaded}
              value={input.value}
            />
          )}
          {append && <span className="AppendedLabel">{append}</span>}
          {touched && ((error && <span className="help-block">{error}</span>))}
        </Col>
      </div>
    );
  }
}

RenderContentTemplateInput.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
  }),
  label: PropTypes.node,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.shape({}),
  }),
  dictionary: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  help: PropTypes.node,
  labelSize: PropTypes.number,
  inputSize: PropTypes.number,
  prepend: PropTypes.node,
  append: PropTypes.string,
  alignClass: PropTypes.string,
};

RenderContentTemplateInput.defaultProps = {
  input: {},
  label: <span />,
  meta: {},
  help: null,
  labelSize: 2,
  inputSize: null,
  append: '',
  prepend: '',
  alignClass: 'text-right',
};

export default RenderContentTemplateInput;
