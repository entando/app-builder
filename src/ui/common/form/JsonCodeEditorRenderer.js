import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'patternfly-react';

import LoadableCodeMirror from 'ui/common/form/LoadableCodeMirror';


const JsonCodeEditorRenderer = ({
  input, name, label, meta: { error, touched }, help,
}) => (

  <div className={(touched && error) ? 'form-group has-error' : 'form-group'}>
    {
      label &&
      <label htmlFor={name} className="col-xs-2 control-label">
        {label} {help}
      </label>
    }
    <Col xs={label ? 10 : 12}>
      <LoadableCodeMirror
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
