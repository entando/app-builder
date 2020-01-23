import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Col, FormGroup, InputGroup } from 'patternfly-react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
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

const msgs = defineMessages({
  selectChoose: {
    id: 'form.select.chooseOne',
    defaultMessage: 'Choose',
  },
});

export class LanguageFormBody extends Component {
  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.handleSubmit();
  };

  render() {
    const {
      intl, invalid, submitting, languages,
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
                  <option>{intl.formatMessage(msgs.selectChoose)}</option>
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
  intl: intlShape.isRequired,
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

export default injectIntl(LanguageForm);
