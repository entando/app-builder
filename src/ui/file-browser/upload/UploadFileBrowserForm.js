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
    handleSubmit, invalid, submitting, loading, history,
  } = props;

  return (
    <form onSubmit={handleSubmit} className="UploadFileBrowserForm form-horizontal">
      <Spinner loading={loading} size="lg" />
      <Field
        className="UploadFileBrowserForm__file"
        name="file"
        component={RenderFileInput}
        validate={[required]}
        label={<FormattedMessage id="fileBrowser.uploadFiles" />}
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
    </form>

  );
};

UploadFileBrowserBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  loading: PropTypes.bool,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
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
