import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Row, Col } from 'patternfly-react';

import FormLabel from 'ui/common/form/FormLabel';
import RenderTextInput from 'ui/common/form/RenderTextInput';

const SimpleWidgetConfigForm = ({ parameters }) => (
  <Row>
    <Col xs={12}>
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
    </Col>
  </Row>
);

SimpleWidgetConfigForm.propTypes = {
  parameters: PropTypes.arrayOf({
    code: PropTypes.string,
    description: PropTypes.string,
  }),
};

SimpleWidgetConfigForm.defaultProps = {
  parameters: [],
};

export default SimpleWidgetConfigForm;
