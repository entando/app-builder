import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'patternfly-react';
import { Field } from 'redux-form';
import { formattedText } from '@entando/utils';
import FormLabel from 'ui/common/form/FormLabel';

const RenderSelectInput = ({
  defaultOptionId, options, labelId, fieldName, mandatory,
}) => (
  <div className="form-group">
    <label htmlFor={fieldName} className="col-xs-2 control-label text-right">
      <FormLabel labelId={labelId} required={mandatory} />
    </label>
    <Col xs={10}>
      <Field
        component="select"
        name={fieldName}
        className="form-control"
      >
        {defaultOptionId &&
          <option value="">
            {formattedText(defaultOptionId)}
          </option>}
        {options.map(item => (
          <option
            key={item.value}
            value={item.value}
            // defaultValue={item.value === defaultValue}
          >{item.text}
          </option>))}
      </Field>
    </Col>
  </div>
);

RenderSelectInput.propTypes = {
  defaultOptionId: PropTypes.string,
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
  defaultOptionId: '',
  options: [],
  mandatory: false,
};
export default RenderSelectInput;
