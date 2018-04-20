import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'patternfly-react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/selection/active-line';


const JsonCodeEditorRenderer = ({
  input, name, label, meta: { error, touched }, help,
}) => (

  <div className={(touched && error) ? 'form-group has-error' : 'form-group'}>
    <label htmlFor={name} className="col-xs-2 control-label">
      {label} {help}
    </label>
    <Col xs={10}>
      <CodeMirror
        value={input.value}
        autoCursor={false}
        onChange={(editor, data, value) => input.onChange(value)}
        onBlur={instance => input.onBlur(instance.doc.getValue())}
        onFocus={instance => input.onFocus(instance.doc.getValue())}
        options={{
          lineNumbers: true,
          mode: { name: 'javascript', json: true },
          styleActiveLine: true,
        }}
      />
      {touched && error && <div className="help-block">{error}</div>}
    </Col>
  </div>

);

JsonCodeEditorRenderer.propTypes = {
  name: PropTypes.string,
  label: PropTypes.node,
  meta: PropTypes.shape({}),
  help: PropTypes.node,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
  }).isRequired,
};

JsonCodeEditorRenderer.defaultProps = {
  name: '',
  label: '',
  meta: {},
  help: null,
};
export default JsonCodeEditorRenderer;
