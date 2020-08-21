import React from 'react';
import PropTypes from 'prop-types';
import { Field, fieldArrayFieldsPropTypes } from 'redux-form';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';

const RenderWidgetParameterFields = ({ fields, parameters }) => {
  const fieldValues = fields.map((name, idx) => {
    const fieldinfo = fields.get(idx);
    return { name, ...fieldinfo };
  }).reduce((acc, curr) => ({
    ...acc,
    [curr.code]: { ...curr },
  }), {});

  return parameters.map((param, idx) => {
    const fieldinfo = fieldValues[param.code] || {
      name: `parameters[${idx}]`,
      code: param.code,
    };
    const { name } = fieldinfo;
    return (
      <Field
        key={name}
        component={RenderTextInput}
        name={`${name}.value`}
        label={<FormLabel labelText={param.code} helpText={param.description} />}
      />
    );
  });
};

RenderWidgetParameterFields.propTypes = {
  fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired,
  parameters: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default RenderWidgetParameterFields;
