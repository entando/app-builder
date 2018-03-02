import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'patternfly-react';
import { Field } from 'redux-form';
import FormLabel from 'ui/common/form/FormLabel';

const RenderSelectInput = ({
  options, labelId, fieldName, mandatory,
}) => (
  <div className="form-group">
    <label htmlFor={fieldName} className="col-xs-2 control-label text-right">
      <FormLabel labelId={labelId} required={mandatory} />
    </label>
    <Col xs={10}>
      <Field component="select" name={fieldName} className="form-control" >
        {options.map(item => (
          <option
            key={item.value}
            value={item.value}
          > {item.text}
          </option>))}
      </Field>
    </Col>
  </div>
);

RenderSelectInput.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    text: PropTypes.string,
  })),
  labelId: PropTypes.string.isRequired,
  mandatory: PropTypes.bool,
  fieldName: PropTypes.string.isRequired,
};

RenderSelectInput.defaultProps = {
  options: [],
  mandatory: false,
};
export default RenderSelectInput;
