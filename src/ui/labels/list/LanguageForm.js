import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, withFormik } from 'formik';
import * as Yup from 'yup';
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

const LanguageFormBody = ({
  intl, isValid, isSubmitting: submitting, languages, ...otherProps
}) => {
  const invalid = !isValid;
  return (
    <div>
      <Form className="LanguageForm form-horizontal">
        <FormGroup>
          <Col xs={12}>
            <label className="control-label" htmlFor="language">
              <FormattedMessage id="language.selectLanguage" />
            </label>
            <InputGroup>
              <Field
                as="select"
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
      </Form>
      <ActiveLangTable {...otherProps} />
    </div>
  );
};

LanguageFormBody.propTypes = {
  intl: intlShape.isRequired,
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  languages: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
  })),
};

LanguageFormBody.defaultProps = {
  isValid: false,
  isSubmitting: false,
  languages: [],
};

const LanguageForm = withFormik({
  mapPropsToValues: () => ({ language: '' }),
  validationSchema: Yup.object().shape({
    language: Yup.string(),
  }),
  handleSubmit: (values, { setSubmitting, resetForm, props: { onSubmit } }) => {
    onSubmit(values).then(() => {
      setSubmitting(false);
      resetForm();
    });
  },
  displayName: 'languageForm',
})(LanguageFormBody);

export default injectIntl(LanguageForm);
