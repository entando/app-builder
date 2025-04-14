import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import { formatMessageMaxLength, formatMessageRequired } from 'helpers/formikValidations';
import { Button, Row, Col } from 'patternfly-react';
import { maxLength } from '@entando/utils';
import { Link } from 'react-router-dom';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import RenderTextInput from 'ui/common/formik-field/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import { ROUTE_FILE_BROWSER, history } from 'app-init/router';

export const maxLength50 = maxLength(50);

const msgs = defineMessages({
  newFolder: {
    id: 'fileBrowser.newFolder',
    defaultMessage: 'New folder',
  },
});

export class CreateFolderFormBody extends Component {
  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.handleSubmit();
  };

  render() {
    const {
      intl, isValid, isSubmitting,
    } = this.props;

    return (
      <Form className="FileBrowserCreateFolder form-horizontal">
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <legend>
                <div className="FileBrowserCreateFolderForm__required-fields text-right">
                  * <FormattedMessage id="app.fieldsRequired" />
                </div>
              </legend>
              <Field
                component={RenderTextInput}
                name="path"
                label={<FormLabel labelId="fileBrowser.newFolder" required />}
                placeholder={intl.formatMessage(msgs.newFolder)}
              />
            </fieldset>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button
              className="pull-right FileBrowserCreateFolderForm__btn-submit"
              type="submit"
              bsStyle="primary"
              disabled={!isValid || isSubmitting}
            >
              <FormattedMessage id="app.save" />
            </Button>
            <Button
              className="pull-right FileBrowserCreateFolderForm__btn-cancel"
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

CreateFolderFormBody.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const CreateFolderForm = withFormik({
  mapPropsToValues: ({ initialValues }) => initialValues,
  enableReinitialize: true,
  validationSchema: ({ intl }) => Yup.object().shape({
    path: Yup.string()
      .required(intl.formatMessage(formatMessageRequired))
      .max(50, intl.formatMessage(formatMessageMaxLength, { max: 50 })),
  }),
  handleSubmit: (values, { props: { onSubmit } }) => {
    onSubmit(values);
  },
  displayName: 'FileBrowserCreateFolderFormik',
})(CreateFolderFormBody);

export default injectIntl(CreateFolderForm);
