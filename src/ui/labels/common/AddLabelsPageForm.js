import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Row, Col } from 'patternfly-react';
import { formattedText } from 'frontend-common-components';
import { FormattedMessage } from 'react-intl';
import { required } from 'util/validateForm';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderTextAreaInput from 'ui/common/form/RenderTextAreaInput';

const EDIT_MODE = 'edit';
const NEW_MODE = 'new';

export const AddLabelsPageFormBody = (props) => {
  const {
    handleSubmit, invalid, submitting, mode,
  } = props;

  const onSubmit = (ev) => {
    ev.preventDefault();
    handleSubmit();
  };


  return (
    <form onSubmit={onSubmit} className="form-horizontal">
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <div className="text-right">
              * <FormattedMessage id="labels.default.language" />
            </div>

            <Field
              component={RenderTextInput}
              name="code"
              label={
                <span>
                  <FormattedMessage id="app.code" />
                </span>
              }
              placeholder={formattedText('labels.code.placeholder')}
              validate={[required]}
              disabled={mode === EDIT_MODE}
            />

          </fieldset>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <div className="tab-content margin-large-bottom ">
              <div>
                <Field
                  name="enCode"
                  component={RenderTextAreaInput}
                  label={
                    <span>
                      <span className="label label-info"><FormattedMessage id="app.en" /></span>
                      &nbsp;<FormattedMessage id="app.name" />
                    </span>
                  }
                  cols="50"
                  rows="2"
                  className="form-control"
                  validate={[required]}
                />
              </div>
            </div>
          </fieldset>
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <div className="tab-content margin-large-bottom ">
              <div>
                <Field
                  name="itCode"
                  component={RenderTextAreaInput}
                  label={
                    <span>
                      <span className="label label-info"><FormattedMessage id="app.it" /></span>
                      &nbsp;<FormattedMessage id="app.name" />
                    </span>
                  }
                  cols="50"
                  rows="2"
                  className="form-control"
                  validate={[required]}
                />
              </div>
            </div>
          </fieldset>
        </Col>
      </Row>
      <br />
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
  );
};

AddLabelsPageFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  mode: PropTypes.string,
};

AddLabelsPageFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  mode: NEW_MODE,
};

const AddLabelsPageForm = reduxForm({
  form: 'labels',
})(AddLabelsPageFormBody);

export default AddLabelsPageForm;
