import React from 'react';
import { PropTypes } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { FormGroup, Button, Row, Col, Alert } from 'patternfly-react';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';


export class SettingsFragmentFormBody extends React.Component {
  componentWillMount() {
    if (this.props.onWillMount) this.props.onWillMount();
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.handleSubmit();
  }

  renderBody() {
    const { alert } = this.props;
    let alertMessage;
    if (alert === 'success') {
      alertMessage = (
        <Alert type="success">
          <FormattedMessage id="fragment.settings.alert.success" />
        </Alert>
      );
    } else if (alert === 'error') {
      alertMessage = (
        <Alert type="error">
          <FormattedMessage id="fragment.settings.alert.error" />
        </Alert>
      );
    }

    return (
      <form onSubmit={this.onSubmit} className="SettingsFragmentForm">
        <Row>
          <Col xs={12}>
            {alertMessage}
            <fieldset>
              <FormGroup>
                <Row>
                  <Col xs={3} className="col-label">
                    <span className="display-block">
                      <FormattedMessage id="fragment.settings" />
                    </span>
                  </Col>
                  <Col xs={9} className="text-left">
                    <Field
                      component={SwitchRenderer}
                      name="enableEditingWhenEmptyDefaultGui"
                    />
                  </Col>
                </Row>
              </FormGroup>
            </fieldset>
            <fieldset>
              <FormGroup>
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
              </FormGroup>
            </fieldset>
          </Col>
        </Row>
      </form>);
  }

  render() {
    return (
      <div className="SettingsFragmentForm">
        {this.renderBody()}
      </div>

    );
  }
}

SettingsFragmentFormBody.propTypes = {
  onWillMount: PropTypes.func,
  handleSubmit: PropTypes.func,
  alert: PropTypes.string,
};

SettingsFragmentFormBody.defaultProps = {
  onWillMount: () => {},
  handleSubmit: () => {},
  alert: null,
};
const SettingsFragmentForm = reduxForm({
  form: 'fragmentSettings',
})(SettingsFragmentFormBody);

export default SettingsFragmentForm;
