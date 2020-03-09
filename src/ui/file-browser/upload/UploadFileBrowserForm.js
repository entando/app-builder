import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { FormGroup, Col, Icon, Button, Spinner } from 'patternfly-react';
import { Link } from 'react-router-dom';
import { ROUTE_FILE_BROWSER } from 'app-init/router';
import { required } from '@entando/utils';
import RenderFileInput from 'ui/common/form/RenderFileInput';

export const UploadFileBrowserBody = (props) => {
  const {
    handleSubmit, invalid, submitting, loading,
  } = props;

  return (
    <form onSubmit={handleSubmit} className="UploadFileBrowserForm form-horizontal">
      <Spinner loading={loading} size="lg" />
      <Field
        className="UploadFileBrowserForm__file"
        name="file"
        component={RenderFileInput}
        validate={[required]}
        label={<FormattedMessage id="fileBrowser.uploadFile" />}
      />
      <FormGroup>
        <Col xs={12}>
          <div className="UploadFileBrowserForm__btn">
            <Button
              type="submit"
              disabled={invalid || submitting}
              className="pull-right UploadFileBrowserForm__btn-save"
              bsStyle="primary"
            >
              <Icon size="lg" name="upload" />&nbsp;
              <FormattedMessage id="app.upload" />
            </Button>
            <Link to={ROUTE_FILE_BROWSER}>
              <Button
                className="pull-right UploadFileBrowserForm__btn-cancel"
              >
                <FormattedMessage id="app.cancel" />
              </Button>
            </Link>
          </div>
        </Col>
      </FormGroup>
    </form>

  );
};

UploadFileBrowserBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  loading: PropTypes.bool,
};

UploadFileBrowserBody.defaultProps = {
  invalid: false,
  submitting: false,
  loading: false,
};

const UploadFileBrowserForm = reduxForm({
  form: 'fileBroswer',
})(UploadFileBrowserBody);
export default UploadFileBrowserForm;
