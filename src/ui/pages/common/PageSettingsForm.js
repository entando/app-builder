import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, OverlayTrigger, Popover, Spinner } from 'patternfly-react';

import { FormattedMessage, injectIntl, intlShape, defineMessages } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import RenderRadioInput from 'ui/common/form/RenderRadioInput';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';

const baseUrlMessages = defineMessages({
  relative: {
    id: 'pageSettings.input.baseURL.relative',
    defaultMessage: 'Relative',
  },
  http: {
    id: 'pageSettings.input.baseURL.http',
    defaultMessage: 'HTTP',
  },
  static: {
    id: 'pageSettings.input.baseURL.static',
    defaultMessage: 'Static',
  },
});

const pageTreeMessages = defineMessages({
  classic: {
    id: 'pageSettings.input.pageTreeStyle.classic',
    defaultMessage: 'Classic',
  },
  breadcrumbs: {
    id: 'pageSettings.input.pageTreeStyle.breadcrumbs',
    defaultMessage: 'Breadcrumb',
  },
});

const HELP_TEXT_APPENDBASEURL = 'pageSettings.appendBaseUrl.help';
const appendBaseUrl = () => (
  <Popover id="appendBaseUrl-switch">
    <p><FormattedMessage id={HELP_TEXT_APPENDBASEURL} /></p>
  </Popover>
);
const HELP_TEXT_JSESSION = 'pageSettings.jsession.help';
const jsession = () => (
  <Popover id="jsession-switch">
    <p><FormattedMessage id={HELP_TEXT_JSESSION} /></p>
  </Popover>
);
const HELP_TEXT_BASEURL = 'pageSettings.baseUrl.help';
const baseUrl = () => (
  <Popover id="baseUrl-switch">
    <p><FormattedMessage id={HELP_TEXT_BASEURL} /></p>
  </Popover>
);

export class PageSettingsFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const {
      intl,
      options,
      loading,
      handleSubmit,
    } = this.props;

    const BASE_URL_TYPES = [
      {
        id: 'relative',
        label: intl.formatMessage(baseUrlMessages.relative),
      },
      {
        id: 'request',
        label: intl.formatMessage(baseUrlMessages.http),
      },
      {
        id: 'static',
        label: intl.formatMessage(baseUrlMessages.static),
      },
    ];

    const URL_STYLE = [
      {
        id: 'classic',
        label: intl.formatMessage(pageTreeMessages.classic),
      },
      {
        id: 'breadcrumbs',
        label: intl.formatMessage(pageTreeMessages.breadcrumbs),
      },
    ];

    const onSubmit = (ev) => {
      ev.preventDefault();
      handleSubmit();
    };

    const selectOptions = options.map(item => ({
      value: item.code,
      text: item.fullTitles,
    }));

    return (
      <Spinner loading={!!loading}>


        <form onSubmit={onSubmit} className="PageSettingsForm form-horizontal">
          <Row>
            <Col xs={12}>
              <fieldset className="no-padding">
                <Field
                  component={RenderSelectInput}
                  options={selectOptions}
                  label={
                    <FormLabel labelId="pageSettings.input.homepage" />
              }
                  name="homePageCode"
                  mandatory
                />
                <Field
                  component={RenderSelectInput}
                  options={selectOptions}
                  label={
                    <FormLabel labelId="pageSettings.input.500" />
              }
                  name="errorPageCode"
                  mandatory
                />
                <Field
                  component={RenderSelectInput}
                  options={selectOptions}
                  label={
                    <FormLabel labelId="pageSettings.input.proceed" />
              }
                  name="loginPageCode"
                  mandatory
                />
                <Field
                  component={RenderSelectInput}
                  options={selectOptions}
                  label={
                    <FormLabel labelId="pageSettings.input.404" />
              }
                  name="notFoundPageCode"
                  mandatory
                />
                <div className="form-group">
                  <Col xs={2} className="text-right">
                    <FormattedMessage id="pageSettings.input.baseURL" />&nbsp;
                    <OverlayTrigger
                      overlay={appendBaseUrl()}
                      placement="top"
                      trigger={['click']}
                      rootClose
                    >
                      <span className="fa fa-info-circle PageSettings__popover-icon" />
                    </OverlayTrigger>
                  </Col>
                  <Col xs={4}>
                    <label htmlFor="1" >
                      <Field
                        component={RenderRadioInput}
                        toggleElement={BASE_URL_TYPES}
                        name="baseUrl"
                      />
                    </label>
                  </Col>
                </div>

                <div className="form-group">
                  <Col xs={2} className="text-right">
                    <FormattedMessage id="pageSettings.input.appendBaseURL" />&nbsp;
                    <OverlayTrigger
                      overlay={baseUrl()}
                      placement="top"
                      trigger={['click']}
                      rootClose
                    >
                      <span className="fa fa-info-circle PageSettings__popover-icon" />
                    </OverlayTrigger>
                  </Col>
                  <Col xs={4}>
                    <Field
                      component={SwitchRenderer}
                      name="baseUrlContext"
                    />
                  </Col>
                  <Col xs={2} className="text-right">
                    <FormattedMessage id="pageSettings.input.jsession" />&nbsp;
                    <OverlayTrigger
                      overlay={jsession()}
                      placement="top"
                      trigger={['click']}
                      rootClose
                    >
                      <span className="fa fa-info-circle PageSettings__popover-icon" />
                    </OverlayTrigger>
                  </Col>
                  <Col xs={4}>
                    <Field
                      component={SwitchRenderer}
                      name="useJsessionId"
                    />
                  </Col>
                </div>

                <div className="form-group">
                  <Col xs={2} className="text-right">
                    <FormattedMessage id="pageSettings.input.languageBrowser" />&nbsp;
                  </Col>
                  <Col xs={4}>
                    <Field
                      component={SwitchRenderer}
                      name="startLangFromBrowser"
                    />
                  </Col>
                </div>

                <div className="form-group">
                  <Col xs={2} className="text-right">
                    <FormattedMessage id="pageSettings.input.pageTreeStyle.url" />
                  </Col>
                  <Col xs={4}>
                    <Field
                      component={RenderRadioInput}
                      toggleElement={URL_STYLE}
                      name="urlStyle"
                    />
                  </Col>

                </div>
              </fieldset>
              <div className="form-group">
                <Col xs={12}>
                  <button
                    type="submit"
                    value="Submit"
                    className="btn btn-primary pull-right"
                  >
                    <FormattedMessage id="app.save" />
                  </button>

                </Col>
              </div>
            </Col>
          </Row>
        </form>
      </Spinner>
    );
  }
}

PageSettingsFormBody.propTypes = {
  intl: intlShape.isRequired,
  onWillMount: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    pageCode: PropTypes.string,
    shortFullTitle: PropTypes.string,
  })),
  loading: PropTypes.bool,
};

PageSettingsFormBody.defaultProps = {
  onWillMount: () => {},
  options: [],
  loading: false,
};

const PageSettingsForm = reduxForm({
  form: 'settings',
})(PageSettingsFormBody);

export default injectIntl(PageSettingsForm);
