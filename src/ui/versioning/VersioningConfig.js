import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Button } from 'patternfly-react';

import FormLabel from 'ui/common/form/FormLabel';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import RenderTextInput from 'ui/common/form/RenderTextInput';

class VersioningConfigBody extends Component {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  render() {
    const {
      handleSubmit,
      invalid,
      submitting,
    } = this.props;

    return (
      <form onSubmit={handleSubmit} className="form-horizontal VersioningConfig">
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <Field
                name="deleteMidVersions"
                component={SwitchRenderer}
                label={<FormLabel labelId="cms.versioning.config.labelDeleteMid" />}
              />
              <Field
                name="contentsToIgnore"
                component={RenderTextInput}
                label={<FormLabel labelId="cms.versioning.config.labelIgnoreContent" />}
              />
              <Field
                name="contentTypesToIgnore"
                component={RenderTextInput}
                label={<FormLabel labelId="cms.versioning.config.labelIgnoreContentTypes" />}
              />
              <Button
                type="submit"
                className="pull-right"
                bsStyle="primary"
                disabled={invalid || submitting}
              >
                <FormattedMessage id="cms.label.save" />
              </Button>
            </fieldset>
          </Col>
        </Row>
      </form>
    );
  }
}

VersioningConfigBody.propTypes = {
  onDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

VersioningConfigBody.defaultProps = {
  invalid: false,
  submitting: false,
};

const VersioningConfig = reduxForm({
  form: 'versionConfig',
})(VersioningConfigBody);

export default VersioningConfig;
