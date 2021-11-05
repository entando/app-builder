import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'patternfly-react';
import { getTouchErrorByField } from 'helpers/formikUtils';

import LoadableCodeMirror from 'ui/common/form/LoadableCodeMirror';


const HtmlCodeEditorRenderer = ({
  field, name, label, form, help,
}) => {
  const { touched, error } = getTouchErrorByField(field.name, form);

  const { setFieldValue, setFieldTouched } = form;
  const onChange = (value) => {
    setFieldTouched(field.name, true);
    setFieldValue(field.name, value);
  };
  return (
    <div className={(touched && error) ? 'form-group has-error' : 'form-group'}>
      <label htmlFor={name} className="col-xs-2 control-label">
        {label} {help}
      </label>
      <Col xs={10}>
        <LoadableCodeMirror
          value={field.value}
          autoCursor={false}
          onChange={(editor, data, value) => onChange(value)}
          onBlur={instance => field.onBlur && field.onBlur(instance.doc.getValue())}
          onFocus={instance => field.onFocus && field.onFocus(instance.doc.getValue())}
          options={{
            lineNumbers: true,
            mode: 'htmlembedded',
            styleActiveLine: true,
          }}
        />
        {touched && error && <div className="help-block">{error}</div>}
      </Col>
    </div>
  );
};

HtmlCodeEditorRenderer.propTypes = {
  name: PropTypes.string,
  label: PropTypes.node,
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
  }),
  help: PropTypes.node,
  field: PropTypes.shape({
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    value: PropTypes.string,
  }),
};

HtmlCodeEditorRenderer.defaultProps = {
  field: null,
  form: {},
  name: '',
  label: '',
  help: null,
};
export default HtmlCodeEditorRenderer;
