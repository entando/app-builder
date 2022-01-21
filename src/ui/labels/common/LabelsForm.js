import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form, Field, withFormik } from 'formik';
import { Button, Row, Col } from 'patternfly-react';
import { validateCodeField, formatMessageRequired } from 'helpers/formikValidations';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import FormLabel from 'ui/common/form/FormLabel';
import RenderTextInput from 'ui/common/formik-field/RenderTextInput';
import RenderTextAreaInput from 'ui/common/formik-field/RenderTextAreaInput';

const EDIT_MODE = 'edit';
const NEW_MODE = 'new';

const msgs = defineMessages({
  codePlaceholder: {
    id: 'labels.code.placeholder',
    defaultMessage: 'Code',
  },
});

const LabelsFormBody = ({
  intl, languages, labelCode, defaultLanguage, mode,
  onDidMount, isValid, isSubmitting: submitting,
}) => {
  useEffect(() => {
    onDidMount(labelCode);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const invalid = !isValid;

  return (
    <Form className="form-horizontal LabelsForm">
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <div className="text-right">
              * <FormattedMessage id="labels.default.language" />
            </div>
            <div>
              <Field
                component={RenderTextInput}
                name="key"
                label={<FormLabel labelId="app.code" helpId="app.help.code" required />}
                placeholder={intl.formatMessage(msgs.codePlaceholder)}
                disabled={mode === EDIT_MODE}
              />
            </div>
          </fieldset>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <div className="tab-content margin-large-bottom ">
              {languages.map(language => (
                <div key={language.code}>
                  <Field
                    name={`titles.${language.code}`}
                    component={RenderTextAreaInput}
                    label={
                      <span>
                        <span className="label label-info">
                          {language.code === defaultLanguage ? `${language.code} *` : language.code}
                        </span>
                        &nbsp;<FormattedMessage id="app.name" />
                      </span>
                    }
                    cols={50}
                    rows={2}
                    className="form-control"
                  />
                </div>
              ))}
            </div>
          </fieldset>
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12}>
          <Button
            className="pull-right LabelsForm__save-btn"
            type="submit"
            bsStyle="primary"
            disabled={invalid || submitting}
          >
            <FormattedMessage id="app.save" />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

LabelsFormBody.propTypes = {
  intl: intlShape.isRequired,
  labelCode: PropTypes.string,
  onDidMount: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  languages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    isActive: PropTypes.bool,
    isDefault: PropTypes.bool,
  })),
  defaultLanguage: PropTypes.string,
  mode: PropTypes.string,
};

LabelsFormBody.defaultProps = {
  labelCode: '',
  isValid: false,
  isSubmitting: false,
  languages: PropTypes.arrayOf(PropTypes.shape({
    code: '',
    isActive: '',
    isDefault: '',
  })),
  defaultLanguage: '',
  mode: NEW_MODE,
};

const LabelsForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ initialValues }) => initialValues,
  mapPropsToErrors: ({ mode, languages }) => {
    switch (mode) {
      default:
      case NEW_MODE: {
        const langs = languages.reduce((acc, curr) => ({
          ...acc,
          [`titles.${curr.code}`]: '',
        }), {});
        return {
          key: '',
          ...langs,
        };
      }
      case EDIT_MODE:
        return {};
    }
  },
  validationSchema: ({ intl, languages }) => {
    const key = Yup.string()
      .required(intl.formatMessage(formatMessageRequired))
      .test(
        'validateCodeField',
        validateCodeField(intl),
      );
    const langFields = languages.reduce((acc, curr) => ({
      ...acc,
      [`titles.${curr.code}`]: Yup.string().required(intl.formatMessage(formatMessageRequired)),
    }), {});
    return Yup.object().shape({ key, ...langFields });
  },
  handleSubmit: (values, { setSubmitting, props: { onSubmit } }) => {
    onSubmit(values).then(() => setSubmitting(false));
  },
  displayName: 'labelForm',
})(LabelsFormBody);

export default injectIntl(LabelsForm);
