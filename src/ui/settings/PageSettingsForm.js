import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Alert, Switch, OverlayTrigger, Popover } from 'patternfly-react';
import { Panel } from 'react-bootstrap';
// import { formattedText } from 'frontend-common-components';
import { FormattedMessage } from 'react-intl';
// import { Field, reduxForm } from 'redux-form';
// import { required, widgetCode, maxLength } from 'util/validateForm';
// import RenderTextInput from 'ui/form/RenderTextInput';
import RenderSelectInput from 'ui/form/RenderSelectInput';


export const renderDefaultUIField = (field) => {
  const { input } = field;
  if (!input.value) {
    return (
      <Alert type="info">
        <FormattedMessage id="widget.page.alert.notAvaible" />
      </Alert>
    );
  }
  return (
    <Panel>
      <Panel.Body><pre>{input.value}</pre></Panel.Body>
    </Panel>
  );
};

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


export class PageSettingsForm extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    const onSubmit = (ev) => {
      ev.preventDefault();
      this.props.handleSubmit();
    };

    return (
      <form onSubmit={onSubmit} className="form-horizontal">
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <RenderSelectInput
                options={['nello', 'lallo', 'rollo']}
                labelId="PageSettings.input.homepage"
              />
              {/* <div className="form-group">
                <Col xs={2} className="text-right">
                  <span id="settings-homePageCode">
                <FormattedMessage id="PageSettings.input.homepage" />
                  </span>
                  <i className="fa fa-asterisk PageSettings__required-icon" />
                </Col>
                <Col xs={10}>
                  <select name="homePageCode" id="settings-homePageCode" className="form-control" >
                <option selected="selected" value="homepage">Home</option>
                <option value="service"> [i].. / Service</option>
                <option value="notfound">.. / .. / Page not found</option>
                  </select>
                </Col>
              </div> */}

              <div className="form-group">
                <Col xs={2} className="text-right">
                  <span id="settings-notFoundPageCode">
                    <FormattedMessage id="PageSettings.input.404" />
                  </span>
                  <i className="fa fa-asterisk PageSettings__required-icon" />
                </Col>
                <Col xs={10}>
                  <select
                    name="notFoundPageCode"
                    id="settings-notFoundPageCode"
                    className="form-control"
                  >
                    <option value="homepage">Home</option>
                    <option value="service"> [i].. / Service</option>
                    <option selected="selected" value="notfound" >.. / .. / Page not found</option>
                  </select>
                </Col>
              </div>

              <div className="form-group">
                <Col xs={2} className="text-right">
                  <span id="settings-errorPageCode" >
                    <FormattedMessage id="PageSettings.input.500" />
                  </span>
                  <i className="fa fa-asterisk PageSettings__required-icon" />
                </Col>
                <Col xs={10}>
                  <select
                    name="errorPageCode"
                    id="settings-errorPageCode"
                    className="form-control"
                  >
                    <option value="homepage">Home</option>
                    <option value="service"> [i].. / Service</option>
                    <option value="notfound">.. / .. / Page not found</option>
                    <option selected="selected" value="errorpage">.. / .. / Error page</option>
                  </select>
                </Col>
              </div>

              <div className="form-group">
                <Col xs={2} className="text-right">
                  <span id="settings-loginPageCode" >
                    <FormattedMessage id="PageSettings.input.proceed" />
                  </span>
                  <i className="fa fa-asterisk PageSettings__required-icon" />
                </Col>
                <Col xs={10}>
                  <select
                    name="loginPageCode"
                    id="settings-loginPageCode"
                    className="form-control"
                  >
                    <option value="homepage">Home</option>
                    <option selected="selected" value="login">.. / .. / Login</option>
                    <option value="backoffice">.. / backoffice</option>
                    <option value="form_mobile">.. / Form Mobile</option>
                  </select>
                </Col>
              </div>

              <div className="form-group">
                <Col xs={2} className="text-right">
                  <FormattedMessage id="PageSettings.input.BaseURL" />&nbsp;
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
                  <div className="btn-group" data-toggle="buttons">
                    <label htmlFor="1" className="btn btn-default ">
                      <input
                        type="radio"
                        className="radiocheck"
                        id="settings-urlStyle-relative"
                        name="baseUrl"
                        value="relative"
                      />
                      <FormattedMessage id="PageSettings.input.BaseURL.relative" />
                    </label>
                    <label htmlFor="1" className="btn btn-default active">
                      <input
                        type="radio"
                        className="radiocheck"
                        id="settings-urlStyle-baseUrl"
                        name="baseUrl"
                        value="request"
                        checked="checked"
                      />
                      <FormattedMessage id="PageSettings.input.BaseURL.http" />
                    </label>
                    <label htmlFor="1" className="btn btn-default ">
                      <input
                        type="radio"
                        className="radiocheck"
                        id="settings-urlStyle-static"
                        name="baseUrl"
                        value="static"
                      />
                      <FormattedMessage id="PageSettings.input.BaseURL.static" />
                    </label>
                  </div>
                </Col>
              </div>

              <div className="form-group">
                <Col xs={2} className="text-right">
                  <FormattedMessage id="PageSettings.input.AppendBaseURL" />&nbsp;
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
                  <Switch
                    bsSize="normal"
                    title="normal"
                    id="BaseURL"
                    onChange=""
                  />
                </Col>
                <Col xs={2} className="text-right">
                  <FormattedMessage id="PageSettings.input.jsession" />&nbsp;
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
                  <Switch
                    bsSize="normal"
                    title="normal"
                    id="jsession"
                    onChange="{onChange()}"
                  />
                </Col>
              </div>

              <div className="form-group">
                <Col xs={2} className="text-right">
                  <FormattedMessage id="PageSettings.input.languageBroswer" />&nbsp;
                </Col>
                <Col xs={4}>
                  <Switch
                    bsSize="normal"
                    title="normal"
                    id="languageBroswer"
                    onChange=""
                  />
                </Col>
              </div>

              <div className="form-group">
                <Col xs={2} className="text-right">
                  <span className="display-block">
                    <FormattedMessage id="PageSettings.input.pageTreeStyle" />
                  </span>
                </Col>
                <Col xs={4}>
                  <div className="btn-group" data-toggle="buttons">

                    <label htmlFor="2" className="btn btn-default  active">
                      <input
                        type="radio"
                        className="radiocheck"
                        id="settings-treeStyle_page_classic"
                        name="treeStyle_page"
                        value="classic"
                        checked="checked"
                      />
                      <FormattedMessage id="PageSettings.input.pageTreeStyle.classic" />
                    </label>
                    <label htmlFor="2" className="btn btn-default ">
                      <input
                        type="radio"
                        className="radiocheck"
                        id="settings-treeStyle_page_request"
                        name="treeStyle_page"
                        value="request"
                      />
                      <FormattedMessage id="PageSettings.input.pageTreeStyle.demand" />
                    </label>
                  </div>
                </Col>
                <Col xs={2} className="text-right">
                  <FormattedMessage id="PageSettings.input.pageTreeStyle.url" />
                </Col>
                <Col xs={4}>
                  <div className="btn-group" data-toggle="buttons">
                    <label htmlFor="2" className="btn btn-default  active">
                      <input
                        type="radio"
                        className="radiocheck"
                        id="settings-urlStyle-classic"
                        name="urlStyle"
                        value="classic"
                        checked="checked"
                      />
                      <FormattedMessage id="PageSettings.input.pageTreeStyle.classic" />
                    </label>
                    <label htmlFor="2" className="btn btn-default ">
                      <input
                        type="radio"
                        className="radiocheck"
                        id="settings-urlStyle-breadcrumbs"
                        name="urlStyle"
                        value="breadcrumbs"
                      />
                      <FormattedMessage id="PageSettings.input.pageTreeStyle.breadcrumbs" />
                    </label>
                  </div>
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
    );
  }
}

PageSettingsForm.propTypes = {
  onWillMount: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
};

PageSettingsForm.defaultProps = {
  onWillMount: () => {},
  invalid: false,
  submitting: false,
};

export default PageSettingsForm;
