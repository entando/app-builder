import React from 'react';
import { PropTypes } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { FormGroup, Button, Row, Col } from 'patternfly-react';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';

export class SettingsFragmentFormBody extends React.Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    return (
      <div className="SettingsFragmentForm">
        <form onSubmit={this.props.handleSubmit} className="SettingsFragmentForm">
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
        </form>
      </div>

    );
  }
}

SettingsFragmentFormBody.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const SettingsFragmentForm = reduxForm({
  form: 'fragmentSettings',
})(SettingsFragmentFormBody);

export default SettingsFragmentForm;
