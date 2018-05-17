import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Field, reduxForm } from 'redux-form';
import { FormGroup, Col, Icon, Button } from 'patternfly-react';
import { Link } from '@entando/router';
import { ROUTE_FILE_BROWSER } from 'app-init/router';
import { required } from '@entando/utils';
import RenderFileInput from 'ui/common/form/RenderFileInput';

export const FileBrowserBody = (props) => {
  const { handleSubmit, invalid, submitting } = props;


  return (
    <Form onSubmit={handleSubmit} className="FileBrowserForm form-horizontal">
      <Field
        className="FileBrowserForm__file"
        name="file"
        component={RenderFileInput}
        validate={[required]}
        label={<FormattedMessage id="fileBrowser.uploadFile" />}
      />
      <FormGroup>
        <Col xs={12}>
          <div className="FileBrowserForm__btn">
            <Button
              type="submit"
              disabled={invalid || submitting}
              className="pull-right FileBrowserForm__btn-save"
              bsStyle="primary"
            >
              <Icon size="lg" name="save" />&nbsp;
              <FormattedMessage id="app.save" />
            </Button>
            <Link route={ROUTE_FILE_BROWSER}>
              <Button
                className="pull-right FileBrowserForm__btn-cancel"
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

FileBrowserBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

FileBrowserBody.defaultProps = {
  invalid: false,
  submitting: false,
};

const FileBrowserForm = reduxForm({
  form: 'fileBroswer',
})(FileBrowserBody);
export default FileBrowserForm;
