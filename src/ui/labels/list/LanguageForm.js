import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Col, FormGroup, InputGroup } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { formattedText } from '@entando/utils';
import FormLabel from 'ui/common/form/FormLabel';
import ActiveLangTable from 'ui/labels/list/ActiveLangTable';

export const renderSelectOptions = options => (
  options.map(option => (
    <option
      key={option.value}
      value={option.value}
    >
      {option.value}&nbsp;&ndash;&nbsp;{option.text}
    </option>
  ))
);

export class LanguageFormBody extends Component {
  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.handleSubmit();
  };

  render() {
    const {
      invalid, submitting, languages,
    } = this.props;

    return (
      <div>
        <form onSubmit={this.onSubmit} className="LanguageForm form-horizontal">
          <FormGroup>
            <Col xs={12}>
              <label className="control-label" htmlFor="language">
                <FormattedMessage id="language.selectLanguage" />
              </label>
              <InputGroup>
                <Field
                  component="select"
                  name="language"
                  label={<FormLabel labelId="label.selectLabel" />}
                  className="form-control LanguageForm__language-field"
                >
                  <option>{formattedText('form.select.chooseOne')}</option>
                  {renderSelectOptions(languages)}
                </Field>
                <span className="input-group-btn">
                  <Button
                    bsStyle="primary"
                    type="submit"
                    disabled={invalid || submitting}
                  >
                    <FormattedMessage id="app.add" />
                  </Button>
                </span>
              </InputGroup>
            </Col>
          </FormGroup>
        </form>
        <ActiveLangTable {...this.props} />
      </div>
    );
  }
}


LanguageFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  languages: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
  })),
};

LanguageFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  languages: [],
};

const LanguageForm = reduxForm({
  form: 'language',
})(LanguageFormBody);

export default LanguageForm;
