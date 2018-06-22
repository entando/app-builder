import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, FormGroup } from 'patternfly-react';
import { Button } from 'react-bootstrap';
import { formattedText, required, maxLength, code } from '@entando/utils';
import { FormattedMessage } from 'react-intl';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import JsonCodeEditorRenderer from 'ui/common/form/JsonCodeEditorRenderer';
import HtmlCodeEditorRenderer from 'ui/common/form/HtmlCodeEditorRenderer';
import FormLabel from 'ui/common/form/FormLabel';
import PageConfigGrid from 'ui/pages/config/PageConfigGrid';


const maxLength50 = maxLength(50);

export const validateJson = (value) => {
  try {
    JSON.parse(value);
    return undefined;
  } catch (e) {
    return `Invalid JSON format: ${e.message}`;
  }
};

export const validatePreviewErrors = (value, allValues, formProps) => {
  if (formProps.previewErrors.length) {
    return formProps.previewErrors.map((err) => {
      const message = formattedText(err.id, '', err.values);
      return <div key={message}>{message}</div>;
    });
  }
  return undefined;
};

export class PageModelFormBody extends Component {
  componentWillMount() {
    if (this.props.onWillMount) {
      this.props.onWillMount(this.props);
    }
  }

  render() {
    const {
      handleSubmit, onSubmit, invalid, submitting, mode, previewCellMap, previewErrors,
    } = this.props;

    const isEditMode = mode === 'edit';

    return (
      <form onSubmit={handleSubmit(onSubmit.bind(this))} className="PageModelForm form-horizontal">
        <Row>
          <Col xs={12}>
            <fieldset>
              <Field
                component={RenderTextInput}
                name="code"
                label={<FormLabel labelId="app.code" helpId="pageModels.code.help" required />}
                placeholder={formattedText('app.code')}
                validate={[required, code]}
                disabled={isEditMode}
              />
            </fieldset>
            <fieldset>
              <Field
                component={RenderTextInput}
                name="descr"
                label={<FormLabel labelId="app.name" helpId="pageModels.name.help" required />}
                placeholder={formattedText('app.name')}
                validate={[required, maxLength50]}
              />
            </fieldset>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FormGroup>
              <Field
                component={JsonCodeEditorRenderer}
                name="configuration"
                label={<FormLabel labelId="pageModels.jsonConfiguration" required />}
                placeholder={formattedText('pageModels.jsonConfiguration')}
                previewErrors={previewErrors}
                validate={[required, validateJson, validatePreviewErrors]}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FormGroup>
              <Field
                component={HtmlCodeEditorRenderer}
                name="template"
                label={<FormLabel labelId="pageModels.template" required />}
                placeholder={formattedText('pageModels.template')}
                validate={[required]}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <label className="col-xs-2 control-label">
            <FormattedMessage id="pageModels.templatePreview" />
          </label>
          <Col xs={10}>
            <PageConfigGrid cellMap={previewCellMap} />
          </Col>
        </Row>
        <Row>
          <br />
          <Col xs={12}>
            <div className="btn-toolbar pull-right">
              <Button
                className="PageModelForm__save-btn"
                type="submit"
                bsStyle="primary"
                disabled={invalid || submitting}
              >
                <FormattedMessage id="app.save" />
              </Button>
            </div>
          </Col>
        </Row>
      </form>
    );
  }
}

PageModelFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  mode: PropTypes.oneOf(['add', 'edit']),
  onWillMount: PropTypes.func,
  previewCellMap: PropTypes.shape({}),
  previewErrors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    values: PropTypes.shape({}),
  })).isRequired,
};

PageModelFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  mode: 'add',
  onWillMount: null,
  previewCellMap: null,
};

const PageModelForm = reduxForm({
  form: 'pageModel',
})(PageModelFormBody);

export default PageModelForm;
