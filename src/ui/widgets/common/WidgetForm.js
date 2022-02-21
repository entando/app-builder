import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { Button, Tabs, Tab, Col, Alert, Spinner, ControlLabel, DropdownButton, MenuItem } from 'patternfly-react';
import { Panel } from 'react-bootstrap';
import { required, widgetCode, maxLength } from '@entando/utils';
import { isUndefined } from 'lodash';

import getAppBuilderWidgetForm from 'helpers/getAppBuilderWidgetForm';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderTextAreaInput from 'ui/common/form/RenderTextAreaInput';
import FormLabel from 'ui/common/form/FormLabel';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';
import JsonCodeEditorRenderer from 'ui/common/form/JsonCodeEditorRenderer';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';
import IconUploader from 'ui/widgets/common/IconUploader';
import RenderDropdownTypeaheadInput from 'ui/common/form/RenderDropdownTypeaheadInput';
import { CONTINUE_SAVE_TYPE, REGULAR_SAVE_TYPE } from 'state/widgets/const';

const MODE_NEW = 'new';
const MODE_EDIT = 'edit';
export const MODE_CLONE = 'clone';
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
  chooseAnOption: {
    id: 'app.chooseAnOption',
    defaultMessage: 'Choose',
  },
  codePlaceholder: {
    id: 'widget.page.create.code.placeholder',
    defaultMessage: 'Code',
  },
  defaultUi: {
    id: 'widget.page.tab.defaultUi',
    defaultMessage: 'Default UI',
  },
  customUi: {
    id: 'widget.page.tab.customUi',
    defaultMessage: 'Custom UI',
  },
  configUi: {
    id: 'widget.page.tab.configUi',
    defaultMessage: 'Config UI',
  },
  config: {
    id: 'widget.page.create.config',
    defaultMessage: 'Configuration',
  },
  parameters: {
    id: 'widget.page.create.parameters',
    defaultMessage: 'Parameters',
  },
});

export class WidgetFormBody extends Component {
  constructor() {
    super();
    this.portalContainer = null;
    this.validateJson = this.validateJson.bind(this);
  }

  componentWillMount() {
    if (this.props.onWillMount) this.props.onWillMount(this.props);
  }

  componentDidMount() {
    this.portalContainer = document.getElementById('widget-button-holder');
  }

  componentWillUnmount() {
    if (this.props.onWillUnmount) this.props.onWillUnmount();
  }

  validateJson(value) {
    const { intl } = this.props;
    try {
      if (value) {
        const parsed = JSON.parse(value);
        if (!('customElement' in parsed)) {
          return intl.formatMessage({ id: 'validateForm.widgetJSON.noCustomElement' });
        } else if (typeof parsed.customElement !== 'string') {
          return intl.formatMessage({ id: 'validateForm.widgetJSON.customElementString' });
        } else if ('resources' in parsed && !Array.isArray(parsed.resources)) {
          return intl.formatMessage({ id: 'validateForm.widgetJSON.resourcesInvalid' });
        } else if (parsed.resources.some(resource => typeof resource !== 'string')) {
          return intl.formatMessage({ id: 'validateForm.widgetJSON.resourcesNotString' });
        }
      }
      return undefined;
    } catch (e) {
      return intl.formatMessage({ id: 'validateForm.widgetJSON.formatInvalid' });
    }
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

  renderButtons() {
    const {
      intl, dirty, onCancel, onDiscard,
      invalid, submitting, mode,
      onReplaceSubmit, onSubmit, handleSubmit,
    } = this.props;

    const handleCancelClick = () => {
      if (dirty) {
        onCancel();
      } else {
        onDiscard();
      }
    };

    return (
      <div>
        {
          mode === MODE_CLONE &&
          <Button
            className="pull-right FragmentForm__save--btn"
            type="submit"
            bsStyle="primary"
            disabled={invalid || submitting}
            onClick={this.props.handleSubmit(values => onReplaceSubmit({ ...values }))}
          >
            <FormattedMessage id="app.saveAndReplace" />
          </Button>
        }
        <div className="FragmentForm__dropdown">
          <DropdownButton
            title={intl.formatMessage({ id: 'app.save' })}
            bsStyle="primary"
            id="saveopts"
            className="FragmentForm__saveDropdown"
          >
            <MenuItem
              id="regularSaveButton"
              eventKey={REGULAR_SAVE_TYPE}
              disabled={invalid || submitting}
              onClick={handleSubmit(values => onSubmit({
          ...values,
        }, REGULAR_SAVE_TYPE))}
            >
              <FormattedMessage id="app.save" />
            </MenuItem>
            <MenuItem
              id="continueSaveButton"
              eventKey={CONTINUE_SAVE_TYPE}
              disabled={invalid || submitting}
              onClick={handleSubmit(values => onSubmit({
          ...values,
        }, CONTINUE_SAVE_TYPE))}
            >
              <FormattedMessage id="app.saveAndContinue" />
            </MenuItem>
          </DropdownButton>
        </div>
        <Button
          className="pull-right"
          bsStyle="default"
          onClick={handleCancelClick}
        >
          <FormattedMessage id="app.cancel" />
        </Button>
      </div>);
  }

  render() {
    const {
      intl, onDiscard, onSave, invalid, submitting, loading, mode, config,
      parentWidget, parentWidgetParameters, defaultUIField, match: { params },
      groups, noPortal, widget, configUiRequired,
    } = this.props;

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
      <Tab eventKey={3} title={intl.formatMessage(msgs.defaultUi)}>
        {
          defaultUIField ? <pre className="WidgetForm__default-ui">{defaultUIField}</pre> :
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

    const NativeWidgetConfigForm = parentWidget
      && mode === MODE_CLONE
      && getAppBuilderWidgetForm(parentWidget, true);

    const isUserWidget = widget && widget.typology === 'user';

    const configUiValidationRules = configUiRequired
      ? [this.validateJson, required]
      : [this.validateJson];

    return (
      <Spinner loading={!!loading}>
        <form className="form-horizontal">
          <div className="WidgetForm__body">
            <div className="WidgetForm__container">
              <fieldset className="no-padding">
                <Tabs className="WidgetForm__tabs" id="basic-tabs">
                  {!parentWidgetParameters.length &&
                    <Tab eventKey={1} title={`${intl.formatMessage(msgs.customUi)} *`} >
                      <Field
                        labelSize={0}
                        name="customUi"
                        component={RenderTextAreaInput}
                        cols={50}
                        rows={8}
                        className="form-control"
                        validate={[required]}
                      />
                    </Tab>
                  }
                  {!parentWidgetParameters.length && defaultUITab}
                  <Tab eventKey={2} title={`${intl.formatMessage(msgs.configUi)}${configUiRequired ? ' *' : ''}`} >
                    <Field
                      component={JsonCodeEditorRenderer}
                      name="configUi"
                      validate={configUiValidationRules}
                    />
                  </Tab>

                  {!!parentWidgetParameters.length && (
                      (mode === MODE_CLONE && !!NativeWidgetConfigForm) ? (
                        <Tab eventKey={4} title={`${intl.formatMessage(msgs.config)} *`} >
                          <fieldset className="no-padding">
                            <Field
                              name="config"
                              component={NativeWidgetConfigForm}
                              cloneMode
                              widgetConfig={config}
                              widgetCode={parentWidget.code}
                              extFormName={widgetFormName}
                              pageCode={params.pageCode}
                              frameId={params.frameId}
                              mode={mode}
                            />
                          </fieldset>
                        </Tab>
                      ) : (
                        <Tab eventKey={4} title={`${intl.formatMessage(msgs.parameters)}`} >
                          <fieldset className="no-padding">
                            {parentWidgetParameters.map(param => (
                              <Field
                                key={param.code}
                                component={RenderTextInput}
                                name={`config.${param.code}`}
                                label={<FormLabel
                                  labelText={param.code}
                                  helpText={param.description}
                                />}
                                disabled={isUserWidget}
                              />
                            ))}
                          </fieldset>
                        </Tab>
                        )
                      )}

                </Tabs>
              </fieldset>
            </div>

            <div className="WidgetForm__info">
              <fieldset className="no-padding">
                <FormSectionTitle titleId="widget.page.create.pageTitle" />
                {this.renderTitleFields()}
                {codeField}
                <Field
                  component={RenderDropdownTypeaheadInput}
                  name="group"
                  label={<FormLabel labelId="widget.page.create.group" required />}
                  options={groups}
                  labelKey="name"
                  valueKey="code"
                  placeholder={intl.formatMessage(msgs.chooseAnOption)}
                  validate={[required]}
                />
                <Field
                  name="widgetCategory"
                  component="input"
                  type="hidden"
                />
                <Field
                  component={IconUploader}
                  name="icon"
                  label={
                    <FormLabel
                      labelId="widget.page.create.icon"
                      helpText={intl.formatMessage({ id: 'widget.icon.helpText' }, { formats: 'SVG' })}
                      required
                    />
                  }
                  validate={[required]}
                />

                {((mode === MODE_EDIT || mode === MODE_CLONE) && parentWidget) && (
                  <div className="form-group">
                    <Col xs={2} className="text-right">
                      <ControlLabel>
                        <FormLabel labelText="Parent Type" />
                      </ControlLabel>
                    </Col>
                    <Col xs={10}>
                      <FormLabel labelText={parentWidget.titles.en} />
                    </Col>
                  </div>
                )}
              </fieldset>
            </div>
          </div>

          {
            noPortal ? this.renderButtons() : this.portalContainer
              && ReactDOM.createPortal(this.renderButtons(), this.portalContainer)
          }

          <ConfirmCancelModalContainer
            contentText={intl.formatMessage({ id: 'app.confirmCancel' })}
            invalid={invalid}
            submitting={submitting}
            onSave={onSave}
            onDiscard={onDiscard}
          />
        </form>
      </Spinner>
    );
  }
}

WidgetFormBody.propTypes = {
  intl: intlShape.isRequired,
  onWillMount: PropTypes.func,
  onWillUnmount: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  config: PropTypes.shape({}),
  groups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  })),
  parentWidgetParameters: PropTypes.arrayOf((
    PropTypes.shape({})
  )),
  parentWidget: PropTypes.shape({
    code: PropTypes.string,
    titles: PropTypes.shape({ en: PropTypes.string }),
  }),
  mode: PropTypes.string,
  defaultUIField: PropTypes.string,
  onChangeDefaultTitle: PropTypes.func,
  dirty: PropTypes.bool,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  onReplaceSubmit: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      pageCode: PropTypes.string,
      frameId: PropTypes.string,
    }),
  }),
  noPortal: PropTypes.bool,
  widget: PropTypes.shape({
    typology: PropTypes.string,
  }),
  configUiRequired: PropTypes.bool,
};

WidgetFormBody.defaultProps = {
  onWillMount: null,
  onWillUnmount: null,
  invalid: false,
  submitting: false,
  groups: [{
    name: '',
    code: '',
  }],
  mode: MODE_NEW,
  config: {},
  defaultUIField: '',
  parentWidget: null,
  parentWidgetParameters: [],
  onChangeDefaultTitle: null,
  dirty: false,
  loading: false,
  match: {
    params: {},
  },
  onReplaceSubmit: () => {},
  noPortal: false,
  widget: {},
  configUiRequired: false,
};

const WidgetForm = reduxForm({
  form: widgetFormName,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(WidgetFormBody);

export default injectIntl(WidgetForm);
