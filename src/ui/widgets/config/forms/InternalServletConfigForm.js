import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Row, Col, FormGroup, Button } from 'patternfly-react';
import FormLabel from 'ui/common/form/FormLabel';

const msgs = defineMessages({
  actionPath: {
    id: 'widgetConfig.internalServlet.actionPath',
    defaultMessage: 'Action Path',
  },
});

export const InternalServletConfigFormBody = ({ intl, handleSubmit }) => (
  <form
    className="InternalServletConfigForm"
    onSubmit={(ev) => { ev.preventDefault(); handleSubmit(); }}
  >
    <h5>
      <i className="fa fa-puzzle-piece" />
      &nbsp;
      <FormattedMessage id="widgetConfig.internalServlet.widgetName" />
    </h5>
    <legend>
      <FormattedMessage id="widgetConfig.internalServlet.parameters" />
    </legend>
    <FormGroup>
      <Row>
        <label htmlFor="displayedInMenu" className="col-xs-2 control-label">
          <FormLabel
            labelId="widgetConfig.internalServlet.actionPath"
            helpId="widgetConfig.internalServlet.actionPath.help"
          />
        </label>
        <Col xs={10}>
          <Field
            id="code"
            component="input"
            className="form-control"
            name="code"
            placeholder={intl.formatMessage(msgs.actionPath)}
          />
        </Col>
      </Row>
    </FormGroup>
    <Row>
      <Col xs={12}>
        <Button
          type="submit"
          bsStyle="primary"
          className="pull-right"
        >
          <FormattedMessage id="app.save" />
        </Button>
      </Col>
    </Row>
  </form>
);


InternalServletConfigFormBody.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const InternalServletConfigForm = reduxForm({
  form: 'widgetConfigForm',
})(InternalServletConfigFormBody);

export default injectIntl(InternalServletConfigForm);
