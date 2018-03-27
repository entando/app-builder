import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Row, Col, InputGroupButton, InputGroup, FormGroup } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { formattedText } from 'frontend-common-components';
import FormLabel from 'ui/common/form/FormLabel';

export const renderSelectOptions = options => (
  options.map(option => (
    <option
      key={option.value}
      value={option.value}
    >
      {option.text}
    </option>
  ))
);

export class LanguageFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.handleSubmit();
  };

  render() {
    const {
      invalid, submitting,
    } = this.props;

    return (
      <form onSubmit={this.onSubmit} className="LanguageForm form-horizontal">
        <Row>
          <Col xs={12}>
            <FormGroup controlId="control-1" disabled={false}>
              <InputGroup>
                <Field
                  component="select"
                  name="name"
                  label={<FormLabel labelId="label.selectLabel" />}
                >
                  <option>{formattedText('form.select.chooseOne')}</option>
                  {renderSelectOptions(this.props.languages)}
                </Field>
                <InputGroupButton>
                  <Button>
                    <FormattedMessage id="app.add" />
                  </Button>
                </InputGroupButton>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button
              className="pull-right"
              type="submit"
              bsStyle="primary"
              disabled={invalid || submitting}
            >
              <FormattedMessage id="app.save" />
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

LanguageFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  onWillMount: PropTypes.func,
  languages: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
  })),
};

LanguageFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  onWillMount: null,
  languages: [],
};

const LanguageForm = reduxForm({
  form: 'group',
})(LanguageFormBody);

export default LanguageForm;
