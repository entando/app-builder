import React from 'react';
import { PropTypes } from 'prop-types';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import { FormattedMessage } from 'react-intl';
import { FormGroup, Button, Row, Col } from 'patternfly-react';
import RenderSwitchInput from 'ui/common/formik-field/RenderSwitchInput';

export class SettingsFragmentFormBody extends React.Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const { isValid, isSubmitting } = this.props;
    return (
      <div className="SettingsFragmentForm">
        <Form className="SettingsFragmentForm">
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
                        component={RenderSwitchInput}
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
                        disabled={!isValid || isSubmitting}
                      >
                        <FormattedMessage id="app.save" />
                      </Button>
                    </Col>
                  </Row>
                </FormGroup>
              </fieldset>
            </Col>
          </Row>
        </Form>
      </div>

    );
  }
}

SettingsFragmentFormBody.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

const SettingsFragmentForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ initialValues }) => initialValues,
  validationSchema: () => (
    Yup.object().shape({
      enableEditingWhenEmptyDefaultGui: Yup.boolean().nullable(true),
    })
  ),
  handleSubmit: (values, { setSubmitting, props: { onSubmit } }) => {
    onSubmit(values).then(() => setSubmitting(false));
  },
  displayName: 'fragmentSettings',
})(SettingsFragmentFormBody);

export default SettingsFragmentForm;
