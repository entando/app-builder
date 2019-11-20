import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button, Row, Col } from 'patternfly-react';

import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';

import ContentPickerContainer from 'ui/widgets/config/forms/ContentPickerContainer';

class SingleContentConfigFormBody extends PureComponent {
  render() {
    const {
      contentModels, handleSubmit, invalid, submitting,
    } = this.props;
    return (
      <Fragment>
        <ContentPickerContainer form="singleContentWidgetConfig" />
        <form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12}>
              <Field
                component={RenderSelectInput}
                name="contentModel"
                label={
                  <FormLabel labelId="widget.singleContent.config.contentModel" />
                }
                options={contentModels}
                optionValue="code"
                optionDisplayName="name"
              />
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Button
                className="pull-right"
                type="submit"
                bsStyle="primary"
                disabled={invalid || submitting}
              >
                <FormattedMessage id="app.save" />
              </Button>
            </Col>
          </Row>
        </form>
      </Fragment>
    );
  }
}

const SingleContentConfigForm = reduxForm({
  form: 'widgets.singleContentConfig',
})(SingleContentConfigFormBody);

SingleContentConfigFormBody.propTypes = {
  contentModels: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default SingleContentConfigForm;
