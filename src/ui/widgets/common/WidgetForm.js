import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { Button, Tabs, Tab, Row, Col, Alert, Spinner, ControlLabel } from 'patternfly-react';
import { Panel } from 'react-bootstrap';
import { required, widgetCode, maxLength } from '@entando/utils';
import { isUndefined } from 'lodash';

import getAppBuilderWidgetForm from 'helpers/getAppBuilderWidgetForm';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';
import JsonCodeEditorRenderer from 'ui/common/form/JsonCodeEditorRenderer';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';
import { hasMicrofrontendConfig } from 'helpers/microfrontends';
import WidgetConfigRenderer from 'ui/widgets/config/renderers/WidgetConfigRenderer';

const MODE_NEW = 'new';
const MODE_EDIT = 'edit';
const MODE_CLONE = 'clone';
const maxLength30 = maxLength(30);
const maxLength70 = maxLength(70);

const widgetFormName = 'widget';

export const renderDefaultUIField = (field) => {
  const { input } = field;
  if (!input.value) {
    return (
      <Alert type="info">
        <FormattedMessage id="widget.page.alert.notAvailable" />
      </Alert>
    );
  }
  return (
    <Panel>
      <Panel.Body><pre className="PageTemplateDetailTable__template">{input.value}</pre></Panel.Body>
    </Panel>
  );
};

const msgs = defineMessages({
  codePlaceholder: {
    id: 'widget.page.create.code.placeholder',
    defaultMessage: 'Code',
  },
  widgetInfoTab: {
    id: 'widget.page.create.general',
    default: 'Info',
  },
  widgetConfigTab: {
    id: 'widget.page.create.config',
    default: 'Config',
  },
  widgetParamsTab: {
    id: 'widget.page.create.parameters',
    default: 'Parameters',
  },
  widgetDefaultConfigTab: {
    id: 'widget.page.create.defaultConfig',
    default: 'Default configuration',
  },
  readonlyPageWidgetConfigHelpText: {
    id: 'widget.help.readonlyPageWidgetConfig',
    default: 'If enabled, the widget will keep the default configuration defined here when it will be configured on a page',
  },
  defaultUi: {
    id: 'widget.page.tab.defaultUi',
    defaultMessage: 'Default UI',
  },
  customUi: {
    id: 'widget.page.tab.customUi',
    defaultMessage: 'Custom UI',
  },
  Tab: {
    id: 'widget.page.tab',
    defaultMessage: 'Tab',
  },
});

const validateJson = (value) => {
  try {
    if (value) {
      JSON.parse(value);
    }
    return undefined;
  } catch (e) {
    return `Invalid JSON format: ${e.message}`;
  }
};

export class WidgetFormBody extends Component {
  componentWillMount() {
    if (this.props.onWillMount) this.props.onWillMount(this.props);
  }

  renderTitleFields() {
    const { intl, onChangeDefaultTitle } = this.props;
    const languages = ['en', 'it'];
    if (!isUndefined(languages)) {
      return languages
        .map((langCode) => {
          const msgTitle = defineMessages({
            label: { id: `app.${langCode}Title` },
          });
          return (
            <Field
              key={langCode}
              component={RenderTextInput}
              name={`titles.${langCode}`}
              label={<FormLabel langLabelText={langCode} labelId="app.title" required />}
              placeholder={intl.formatMessage(msgTitle.label)}
              validate={[required, maxLength70]}
              onChange={(ev) => {
                if (onChangeDefaultTitle && langCode === 'en') {
                  onChangeDefaultTitle(ev.currentTarget.value);
                }
              }}
            />
          );
        });
    }
    return null;
  }

  render() {
    const {
      intl, dirty, onCancel, onDiscard,
      invalid, submitting, loading, mode,
      parentWidget, parentWidgetParameters,
      parameters, onReplaceSubmit, onSubmit,
      selectedWidget, history, formId, formWidgetConfig, beforeSubmit,
      widgetConfigDirty, widgetConfigInvalid,
    } = this.props;

    const handleCancelClick = () => {
      if (dirty || widgetConfigDirty) {
        onCancel();
      } else {
        onDiscard();
      }
    };

    let codeField = (
      <Field
        component={RenderTextInput}
        name="code"
        label={
          <FormLabel labelId="widget.page.create.code" helpId="app.help.code" required />
        }
        placeholder={intl.formatMessage(msgs.codePlaceholder)}
        validate={[required, widgetCode, maxLength30]}
      />
    );

    let defaultUITab = (
      <Tab eventKey={2} title={intl.formatMessage(msgs.defaultUi)} >
        {
          this.props.defaultUIField ? this.props.defaultUIField :
          <Alert type="info">
            <FormattedMessage id="widget.page.alert.notAvailable" />
          </Alert>
        }
      </Tab>
    );

    if (mode === MODE_EDIT) {
      codeField = null;
    } else {
      defaultUITab = null;
    }

    const hasParentWidget = parentWidgetParameters.length > 0;
    const hasOwnParams = !hasParentWidget && parameters.length > 0;
    const showConfigTab = selectedWidget && !selectedWidget.locked &&
      (hasParentWidget || hasOwnParams || hasMicrofrontendConfig(selectedWidget));

    const NativeWidgetConfigForm = selectedWidget
      && (mode === MODE_EDIT || mode === MODE_CLONE)
      && getAppBuilderWidgetForm(selectedWidget, true);

    const determineFormKind = () => {
      if (NativeWidgetConfigForm) {
        return 'widgetConfig';
      } else if (hasParentWidget) {
        return 'widgetParams';
      } else if (hasOwnParams) {
        return 'widgetDefaultConfig';
      }
      return '';
    };

    const formKind = determineFormKind();
    const paramFieldChoices = {
      widgetConfig: parentWidgetParameters,
      widgetParams: parentWidgetParameters,
      widgetDefaultConfig: parameters,
    };

    const paramFields = paramFieldChoices[formKind] || [];

    const renderSaveAndReplaceButton = mode === MODE_CLONE ? (
      <Button
        className="pull-right FragmentForm__save--btn"
        type="submit"
        bsStyle="primary"
        disabled={invalid || submitting}
        onClick={this.props.handleSubmit(values => onReplaceSubmit({ ...values }))}
      >
        <FormattedMessage id="app.saveAndReplace" />
      </Button>
    ) : null;

    return (
      <Spinner loading={!!loading}>
        <form
          onSubmit={this.props.handleSubmit(values =>
            onSubmit({
              values, widgetConfig: formWidgetConfig, formId, beforeSubmit, widget: selectedWidget,
            }))}
          className="form-horizontal"
        >
          <Tabs id="widget-form-tab" defaultActiveKey={1} className="WidgetForm__maintab">
            <Tab eventKey={1} title={intl.formatMessage(msgs.widgetInfoTab)}>
              <Row>
                <Col xs={12}>
                  <fieldset className="no-padding">
                    {this.renderTitleFields()}
                    {codeField}
                    <Field
                      component={RenderSelectInput}
                      name="group"
                      label={
                        <FormLabel labelId="widget.page.create.group" required />
                    }
                      validate={required}
                      options={this.props.groups}
                      optionValue="code"
                      optionDisplayName="name"
                      defaultOptionId="app.chooseAnOption"
                    />
                    {selectedWidget && !selectedWidget.locked &&
                      <Field
                        name="readonlyPageWidgetConfig"
                        component={SwitchRenderer}
                        label={
                          <FormLabel labelId="widget.page.create.readonlyPageWidgetConfig" helpText={intl.formatMessage(msgs.readonlyPageWidgetConfigHelpText)} />
                        }
                      />
                    }
                    <Field
                      name="widgetCategory"
                      component="input"
                      type="hidden"
                    />
                    {((mode === MODE_EDIT || mode === MODE_CLONE) && parentWidget) && (
                      <div className="form-group">
                        <Col xs={2} className="text-right">
                          <ControlLabel>
                            <FormLabel labelId="widget.page.create.parentWidget" />
                          </ControlLabel>
                        </Col>
                        <Col xs={10}>
                          <FormLabel labelText={parentWidget.titles.en} />
                        </Col>
                      </div>
                    )}
                  </fieldset>
                </Col>
              </Row>
              {!parentWidgetParameters.length && (
                <Row>
                  <Col xs={12}>
                    <fieldset className="no-padding">
                      <Col xs={12}>
                        <div className="form-group">
                          <span className="control-label col-xs-2" />
                          <Col xs={10}>
                            <Tabs id="basic-tabs" defaultActiveKey={1}>
                              <Tab eventKey={1} title={intl.formatMessage(msgs.customUi)} >
                                <Field
                                  name="customUi"
                                  component="textarea"
                                  cols="50"
                                  rows="8"
                                  className="form-control"
                                  disabled={hasParentWidget}
                                  validate={[required]}
                                />
                              </Tab>
                              {defaultUITab}
                            </Tabs>
                          </Col>
                        </div>
                      </Col>
                    </fieldset>
                  </Col>
                </Row>
              )}
              <Row>
                <Col xs={12}>
                  <Field
                    component={JsonCodeEditorRenderer}
                    name="configUi"
                    label={<FormLabel labelId="widgets.configUi" />}
                    disabled={hasParentWidget}
                    validate={[validateJson]}
                  />
                </Col>
              </Row>
            </Tab>

            {showConfigTab && (
              <Tab
                eventKey={2}
                title={intl.formatMessage(msgs.widgetDefaultConfigTab)}
              >
                <Row>
                  <Col xs={12}>
                    <fieldset className="no-padding">
                      <Field
                        name="config"
                        component={WidgetConfigRenderer}
                        cloneMode
                        widgetConfig={formWidgetConfig}
                        widgetCode={selectedWidget && selectedWidget.code}
                        extFormName={widgetFormName}
                        widget={{ ...selectedWidget, parameters: paramFields }}
                        onSubmit={onSubmit}
                        history={history}
                      />
                    </fieldset>
                  </Col>
                </Row>
              </Tab>
              )}
          </Tabs>
          <br />
          <Row>
            <Col xs={12}>
              {renderSaveAndReplaceButton}
              <Button
                className="pull-right FragmentForm__save--btn"
                type="submit"
                bsStyle="primary"
                disabled={invalid || submitting || widgetConfigInvalid}
              >
                <FormattedMessage id="app.save" />
              </Button>
              <Button
                className="pull-right"
                bsStyle="default"
                onClick={handleCancelClick}
              >
                <FormattedMessage id="app.cancel" />
              </Button>
              <ConfirmCancelModalContainer
                contentText={intl.formatMessage({ id: 'app.confirmCancel' })}
                invalid={invalid}
                submitting={submitting}
                onSave={this.props.handleSubmit(values =>
                  onSubmit({
                    values, widgetConfig: formWidgetConfig, formId, beforeSubmit,
                  }))}
                onDiscard={onDiscard}
              />
            </Col>
          </Row>
        </form>
      </Spinner>
    );
  }
}

WidgetFormBody.propTypes = {
  intl: intlShape.isRequired,
  onWillMount: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  groups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  })),
  parentWidgetParameters: PropTypes.arrayOf((
    PropTypes.shape({})
  )),
  parentWidget: PropTypes.shape({
    code: PropTypes.string,
  }),
  selectedWidget: PropTypes.shape({
    code: PropTypes.string,
  }),
  parameters: PropTypes.arrayOf(PropTypes.shape({})),
  mode: PropTypes.string,
  defaultUIField: PropTypes.string,
  onChangeDefaultTitle: PropTypes.func,
  dirty: PropTypes.bool,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  onReplaceSubmit: PropTypes.func,
  history: PropTypes.shape({}).isRequired,
  formId: PropTypes.string,
  formWidgetConfig: PropTypes.shape({}),
  beforeSubmit: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  widgetConfigInvalid: PropTypes.bool,
  widgetConfigDirty: PropTypes.bool,
};

WidgetFormBody.defaultProps = {
  onWillMount: null,
  invalid: false,
  submitting: false,
  groups: [{
    name: '',
    code: '',
  }],
  mode: MODE_NEW,
  defaultUIField: '',
  parentWidget: null,
  selectedWidget: null,
  parentWidgetParameters: [],
  onChangeDefaultTitle: null,
  parameters: [],
  dirty: false,
  loading: false,
  onReplaceSubmit: () => {},
  formId: '',
  formWidgetConfig: {},
  beforeSubmit: null,
  widgetConfigDirty: false,
  widgetConfigInvalid: false,
};

const WidgetForm = reduxForm({
  form: widgetFormName,
})(WidgetFormBody);

export default injectIntl(WidgetForm);
