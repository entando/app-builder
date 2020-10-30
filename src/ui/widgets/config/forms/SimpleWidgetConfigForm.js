import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Row, Col } from 'patternfly-react';

import FormLabel from 'ui/common/form/FormLabel';
import RenderTextInput from 'ui/common/form/RenderTextInput';

export const SIMPLE_WIDGET_CONFIG_FORM_ID = 'simpleWidgetConfigFormId';

const SimpleWidgetConfigForm = ({ parameters, onSubmit }) => (
  <Row>
    <Col xs={12}>
      <form onSubmit={onSubmit} className="form-horizontal">
        <fieldset className="no-padding">
          {parameters.map(param => (
            <Field
              key={param.code}
              component={RenderTextInput}
              name={`config.${param.code}`}
              label={(
                <FormLabel
                  labelText={param.code}
                  helpText={param.description}
                />
            )}
            />
        ))}
        </fieldset>
      </form>
    </Col>
  </Row>
);

SimpleWidgetConfigForm.propTypes = {
  parameters: PropTypes.arrayOf({
    code: PropTypes.string,
    description: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

SimpleWidgetConfigForm.defaultProps = {
  parameters: [],
};

const SimpleWidgetConfig = reduxForm({
  form: SIMPLE_WIDGET_CONFIG_FORM_ID,
})(SimpleWidgetConfigForm);

export default SimpleWidgetConfig;
