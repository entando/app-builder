import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Row, Col, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import FormLabel from 'ui/common/form/FormLabel';
import RenderTextInput from 'ui/common/form/RenderTextInput';

export const SIMPLE_WIDGET_CONFIG_FORM_ID = 'simpleWidgetConfigFormId';

const SimpleWidgetConfigForm = ({ parameters, handleSubmit }) => (
  <Row>
    <Col xs={12}>
      <form onSubmit={handleSubmit} className="form-horizontal">
        <fieldset className="no-padding">
          {parameters.map(param => (
            <Field
              key={param.code}
              component={RenderTextInput}
              name={param.code}
              label={(
                <FormLabel
                  labelText={param.code}
                  helpText={param.description}
                />
            )}
            />
        ))}
        </fieldset>
        <Button
          className="pull-right"
          type="submit"
          bsStyle="primary"
        >
          <FormattedMessage id="app.save" />
        </Button>
      </form>
    </Col>
  </Row>
);

SimpleWidgetConfigForm.propTypes = {
  parameters: PropTypes.arrayOf({
    code: PropTypes.string,
    description: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
};

SimpleWidgetConfigForm.defaultProps = {
  parameters: [],
};

const SimpleWidgetConfig = reduxForm({
  form: SIMPLE_WIDGET_CONFIG_FORM_ID,
})(SimpleWidgetConfigForm);

export default SimpleWidgetConfig;
