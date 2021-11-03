import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'patternfly-react';

import LoadableCodeMirror from 'ui/common/form/LoadableCodeMirror';


const JsonCodeEditorRenderer = ({
  input, field, name, label, form, meta, help,
}) => {
  const isField = field !== null;
  let inputProps;
  let onChangeProp;
  if (isField) {
    const { setFieldValue, setFieldTouched } = form;
    inputProps = field;
    onChangeProp = (value) => {
      setFieldTouched(field.name, true);
      setFieldValue(field.name, value);
    };
  } else {
    inputProps = input;
    onChangeProp = input.onChange;
  }
  const { touched, error } = isField
    ? { touched: form.touched[field.name], error: form.errors[field.name] }
    : meta;
  return (
    <div className={(touched && error) ? 'form-group has-error' : 'form-group'}>
      {
        label &&
        <label htmlFor={name} className="col-xs-2 control-label">
          {label} {help}
        </label>
      }
      <Col xs={label ? 10 : 12}>
        <LoadableCodeMirror
          value={inputProps.value}
          autoCursor={false}
          onChange={(editor, data, value) => onChangeProp(value)}
          onBlur={instance => inputProps.onBlur && inputProps.onBlur(instance.doc.getValue())}
          onFocus={instance => inputProps.onFocus && inputProps.onFocus(instance.doc.getValue())}
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
};

const InputPropType = PropTypes.shape({
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
});

JsonCodeEditorRenderer.propTypes = {
  name: PropTypes.string,
  label: PropTypes.node,
  meta: PropTypes.shape({}),
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
  }),
  help: PropTypes.node,
  input: InputPropType,
  field: InputPropType,
};

JsonCodeEditorRenderer.defaultProps = {
  input: {},
  field: null,
  form: {},
  name: '',
  label: '',
  meta: {},
  help: null,
};
export default JsonCodeEditorRenderer;
