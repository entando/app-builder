import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FormGroup, Col, Icon, Button, Spinner } from 'patternfly-react';
import { Link } from 'react-router-dom';
import { ROUTE_FILE_BROWSER, history } from 'app-init/router';
import RenderFileInput from 'ui/common/formik-field/RenderFileInput';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

export const UploadFileBrowserBody = (props) => {
  const {
    isValid, isSubmitting, loading,
  } = props;

  return (
    <Form aria-label="form" className="UploadFileBrowserForm form-horizontal">
      <Spinner loading={loading} size="lg" />
      <Field
        className="UploadFileBrowserForm__file"
        name="file"
        component={RenderFileInput}
        label={<FormattedMessage id="fileBrowser.uploadFiles" />}
      />
      <FormGroup>
        <Col xs={12}>
          <div className="UploadFileBrowserForm__btn">
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="pull-right UploadFileBrowserForm__btn-save"
              bsStyle="primary"
            >
              <Icon size="lg" name="upload" />&nbsp;
              <FormattedMessage id="app.upload" />
            </Button>
            <Link to={{ pathname: ROUTE_FILE_BROWSER, state: { from: history.location.pathname } }}>
              <Button
                className="pull-right UploadFileBrowserForm__btn-cancel"
              >
                <FormattedMessage id="app.cancel" />
              </Button>
            </Link>
          </div>
        </Col>
      </FormGroup>
    </Form>

  );
};

UploadFileBrowserBody.propTypes = {
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  loading: PropTypes.bool,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

UploadFileBrowserBody.defaultProps = {
  isValid: false,
  isSubmitting: false,
  loading: false,
};

const UploadFileBrowserForm = withFormik({
  mapPropsToValues: ({ initialValues }) => initialValues,
  enableReinitialize: true,
  validationSchema: () => Yup.object().shape({
    file: Yup.mixed().required(),
  }),
  handleSubmit: (values, { props: { onSubmit } }) => {
    onSubmit(values);
  },
  displayName: 'fileBrowserUploadForm',
})(UploadFileBrowserBody);


export default UploadFileBrowserForm;
