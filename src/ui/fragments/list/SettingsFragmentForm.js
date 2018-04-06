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
    return !this.props.error ?
      <form onSubmit={this.onSubmit} className="SettingsFragmentForm">
        <Row>
          <Col xs={12}>
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
      </form> :
      <Alert type="error">
        <FormattedMessage id="pageSettings.input.500" />
      </Alert>;
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
  error: PropTypes.string,
};

SettingsFragmentFormBody.defaultProps = {
  onWillMount: () => {},
  handleSubmit: () => {},
  error: null,
};
const SettingsFragmentForm = reduxForm({
  form: 'fragmentSettings',
})(SettingsFragmentFormBody);

export default SettingsFragmentForm;
