import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, FormGroup } from 'patternfly-react';
import { Button } from 'react-bootstrap';
import { required, maxLength } from '@entando/utils';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import JsonCodeEditorRenderer from 'ui/common/form/JsonCodeEditorRenderer';
import HtmlCodeEditorRenderer from 'ui/common/form/HtmlCodeEditorRenderer';
import FormLabel from 'ui/common/form/FormLabel';
import PageConfigGrid from 'ui/pages/config/PageConfigGrid';


const maxLength50 = maxLength(50);
const maxLength40 = maxLength(40);

export const validateJson = (value) => {
  try {
    JSON.parse(value);
    return undefined;
  } catch (e) {
    return `Invalid JSON format: ${e.message}`;
  }
};

const msgs = defineMessages({
  appCode: {
    id: 'app.code',
    defaultMessage: 'Code',
  },
  appName: {
    id: 'app.name',
    defaultMessage: 'Name',
  },
  pageConfig: {
    id: 'pageModels.jsonConfiguration',
    defaultMessage: 'JSON Configuration',
  },
  pageTemplate: {
    id: 'pageModels.template',
    defaultMessage: 'Template',
  },
});

export class PageModelFormBody extends Component {
  constructor(props) {
    super(props);
    this.validatePreviewErrors = this.validatePreviewErrors.bind(this);
  }

  componentDidMount() {
    if (this.props.onWillMount) {
      this.props.onWillMount(this.props);
    }
  }

  validatePreviewErrors(value, allValues, formProps) {
    const { intl } = this.props;
    if (formProps.previewErrors.length) {
      return formProps.previewErrors.map(({ id, values }) => {
        const errMsgs = defineMessages({
          err: { id },
        });
        const message = intl.formatMessage(errMsgs.err, values);
        return <div key={message}>{message}</div>;
      });
    }
    return undefined;
  }

  render() {
    const {
      intl, handleSubmit, invalid, submitting, mode, previewCellMap, previewErrors,
    } = this.props;

    const isEditMode = mode === 'edit';

    return (
      <form onSubmit={handleSubmit} className="PageModelForm form-horizontal">
        <Row>
          <Col xs={12}>
            <fieldset>
              <Field
                component={RenderTextInput}
                name="code"
                label={<FormLabel labelId="app.code" helpId="pageModels.code.help" required />}
                placeholder={intl.formatMessage(msgs.appCode)}
                validate={[required, maxLength40]}
                disabled={isEditMode}
              />
            </fieldset>
            <fieldset>
              <Field
                component={RenderTextInput}
                name="descr"
                label={<FormLabel labelId="app.name" helpId="pageModels.name.help" required />}
                placeholder={intl.formatMessage(msgs.appName)}
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
                placeholder={intl.formatMessage(msgs.pageConfig, 13)}
                previewErrors={previewErrors}
                validate={[required, validateJson, this.validatePreviewErrors]}
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
                placeholder={intl.formatMessage(msgs.pageTemplate)}
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
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
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

export default injectIntl(PageModelForm);
