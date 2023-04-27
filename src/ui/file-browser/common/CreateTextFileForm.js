import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import { formatMessageMaxLength, formatMessageRequired } from 'helpers/formikValidations';
import { Button, Row, Col, Icon } from 'patternfly-react';
import { maxLength } from '@entando/utils';
import { Link } from 'react-router-dom';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import RenderTextAreaInput from 'ui/common/formik-field/RenderTextAreaInput';
import FormLabel from 'ui/common/form/FormLabel';
import { ROUTE_FILE_BROWSER, history } from 'app-init/router';
import RenderTextInput from 'ui/common/formik-field/RenderTextInput';

export const maxLength50 = maxLength(50);

const msgs = defineMessages({
  textFileContent: {
    id: 'fileBrowser.textFile.content',
    defaultMessage: 'File Content',
  },
  textFilePlaceholder: {
    id: 'fileBrowser.textFile.placeholder',
    defaultMessage: 'File Placeholder',
  },
});

export class CreateTextFileFormBody extends Component {
  componentWillMount() {
    const { filename, onWillMount } = this.props;
    onWillMount(filename);
  }
  render() {
    const {
      intl, isValid, isSubmitting, handleSubmit, mode, filename, onClickDownload,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit} className="CreateTextFileForm form-horizontal">
        <Row>
          <Col xs={9}>
            { mode !== 'edit' ?
              <Field
                component={RenderTextInput}
                name="name"
                label={<FormLabel labelId="app.name" />}
              /> :
              <div className="CreateTextFileForm__download-filename">{filename}

                <a
                  className="CreateTextFileForm__link-download"
                  role="presentation"
                  download
                  onClick={() => onClickDownload({ name: filename })}
                >
                  <Icon className="CreateTextFileForm__download-filename-icon" size="lg" name="download" />
                </a>
              </div>
            }

          </Col>
          {
                mode !== 'edit' ?
                  <Col xs={3}>
                    <label htmlFor="file-extension" className="sr-only">Extension</label>
                    <Field
                      component="select"
                      name="extension"
                      className="CreateTextFileForm__select-extension form-control"
                    >
                      <option value=".txt">txt</option>
                      <option value=".css">css</option>
                    </Field>
                  </Col>
              : null
            }
        </Row>
        <Row>
          <Col xs={9}>
            <Field
              component={RenderTextAreaInput}
              cols={50}
              rows={20}
              label={intl.formatMessage(msgs.textFileContent)}
              name="content"
              placeholder={intl.formatMessage(msgs.textFilePlaceholder)}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} >
            <Button
              className="pull-right CreateTextFileForm__btn-submit"
              type="submit"
              bsStyle="primary"
              disabled={!isValid || isSubmitting}
            >
              <FormattedMessage id="app.save" />
            </Button>
            <Button
              className="pull-right CreateTextFileForm__btn-cancel"
              componentClass={Link}
              to={{ pathname: ROUTE_FILE_BROWSER, state: { from: history.location.pathname } }}
            >
              <FormattedMessage id="app.cancel" />
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
CreateTextFileFormBody.propTypes = {
  intl: intlShape.isRequired,
  onWillMount: PropTypes.func,
  onClickDownload: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  mode: PropTypes.string,
  filename: PropTypes.string,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

CreateTextFileFormBody.defaultProps = {
  onWillMount: () => {},
  onClickDownload: () => {},
  mode: '',
  filename: '',
};

const CreateTextFileForm = withFormik({
  mapPropsToValues: ({ initialValues }) => initialValues,
  enableReinitialize: true,
  validationSchema: ({ intl, mode }) => Yup.object().shape({
    name: mode === 'edit' ? null : Yup.string()
      .required(intl.formatMessage(formatMessageRequired))
      .max(50, intl.formatMessage(formatMessageMaxLength, { max: 50 })),
    extension: mode === 'edit' ? null : Yup.string().required(intl.formatMessage(formatMessageRequired)),
    content: Yup.string().required(intl.formatMessage(formatMessageRequired)),
  }),
  handleSubmit: (values, { props: { onSubmit } }) => {
    onSubmit(values);
  },
  displayName: 'CreateTextFileFormFormik',
})(CreateTextFileFormBody);

export default injectIntl(CreateTextFileForm);
