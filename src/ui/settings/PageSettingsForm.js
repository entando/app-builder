import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Alert } from 'patternfly-react';
import { Panel } from 'react-bootstrap';
// import { formattedText } from 'frontend-common-components';
import { FormattedMessage } from 'react-intl';
// import { Field, reduxForm } from 'redux-form';
// import { required, widgetCode, maxLength } from 'util/validateForm';
// import RenderTextInput from 'ui/form/RenderTextInput';


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

              <div className="form-group">
                <div className="row">
                  <div className="col-xs-2 ">
                    <span id="settings-homePageCode">Home page</span>
                    <i className="fa fa-asterisk required-icon" />
                  </div>
                  <Col xs={10}>
                    <select name="homePageCode" id="settings-homePageCode" >
                      <option selected="selected" value="homepage">Home</option>
                      <option value="service"> [i].. / Service</option>
                      <option value="notfound">.. / .. / Page not found</option>
                    </select>
                  </Col>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-xs-2 ">
                    <span
                      id="settings-notFoundPageCode"
                    >Page for: 404 - Page not found
                    </span>
                    <i className="fa fa-asterisk required-icon" />
                  </div>
                  <Col xs={10}>
                    <select
                      name="notFoundPageCode"
                      id="settings-notFoundPageCode"
                      className="form-control"
                    >
                      <option
                        value="homepage"
                      >Home
                      </option>
                      <option
                        value="service"
                      > [i].. / Service
                      </option>
                      <option
                        selected="selected"
                        value="notfound"
                      >.. / .. / Page not found
                      </option>
                    </select>
                  </Col>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-xs-2 ">
                    <span
                      id="settings-errorPageCode"
                    >Page for: 500 - Generic error
                    </span>
                    <i className="fa fa-asterisk required-icon" />
                  </div>
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
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-xs-2 ">
                    <span
                      id="settings-loginPageCode"
                    >Page for: Sign in to procede further
                    </span>
                    <i className="fa fa-asterisk required-icon" />
                  </div>
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
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-xs-2 ">
                    <span>Base URL
                      {/* <a
                        href="#"
                        tabIndex="0"
                        role="button"
                        data-toggle="popover"
                      > */}
                      <span className="fa fa-info-circle" />
                      {/* </a> */}
                    </span>
                  </div>
                  <div className="col-xs-10 text-left">
                    <div className="btn-group" data-toggle="buttons">
                      <label htmlFor="1" className="btn btn-default ">
                        <input
                          type="radio"
                          className="radiocheck"
                          id="settings-urlStyle-relative"
                          name="baseUrl"
                          value="relative"
                        />
                        Relative
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
                        Built by HTTP request parameters
                      </label>
                      <label htmlFor="1" className="btn btn-default ">
                        <input
                          type="radio"
                          className="radiocheck"
                          id="settings-urlStyle-static"
                          name="baseUrl"
                          value="static"
                        />
                        Static
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-xs-2 ">
                    Append context name on BaseURL
                    {/* <a
                      href="#"
                      tabIndex="0"
                      role="button"
                      data-toggle="popover"
                      data-original-title=""
                    > */}
                    <span className="fa fa-info-circle" />
                    {/* </a> */}
                  </div>
                  <div className="col-xs-4 text-left">
                    <input
                      type="hidden"
                      value="true"
                      id="baseUrlContext"
                      name="baseUrlContext"
                    />
                    <input
                      type="checkbox"
                      value="true"
                      id="ch_baseUrlContext"
                      className="bootstrap-switch"
                      checked="checked"
                    />
                  </div>

                  <div className="col-xs-2 ">
                    Use JSESSIONID
                    {/* <a
                      href="#"
                      tabIndex="0"
                      role="button"
                      data-toggle="popover"
                      data-original-title=""
                    > */}
                    <span className="fa fa-info-circle" />
                    {/* </a> */}

                  </div>
                  <div className="col-xs-4 text-left">

                    <input
                      type="hidden"
                      value="false"
                      id="useJsessionId"
                      name="useJsessionId"
                    />
                    <input
                      type="checkbox"
                      value="false"
                      id="ch_useJsessionId"
                      className="bootstrap-switch"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-xs-2 ">
                    Home page gets its language from the browser
                  </div>
                  <div className="col-xs-4 text-left">

                    <input
                      type="hidden"
                      value="false"
                      id="startLangFromBrowser"
                      name="startLangFromBrowser"
                    />
                    <input
                      type="checkbox"
                      value="false"
                      id="ch_startLangFromBrowser"
                      className="bootstrap-switch"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">

                  <div className="col-xs-2 ">
                    <span className="display-block">Choose the style of the Page tree</span>
                  </div>
                  <div className="col-xs-4 text-left">
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
                        Classic
                      </label>
                      <label htmlFor="2" className="btn btn-default ">
                        <input
                          type="radio"
                          className="radiocheck"
                          id="settings-treeStyle_page_request"
                          name="treeStyle_page"
                          value="request"
                        />
                        Load nodes on demand
                      </label>
                    </div>
                  </div>
                  <div className="col-xs-2 ">
                    URL style
                  </div>
                  <div className="col-xs-4 text-left">
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
                        Classic
                      </label>
                      <label htmlFor="2" className="btn btn-default ">
                        <input
                          type="radio"
                          className="radiocheck"
                          id="settings-urlStyle-breadcrumbs"
                          name="urlStyle"
                          value="breadcrumbs"
                        />
                        Breadcrumbs
                      </label>
                    </div>
                  </div>

                </div>
              </div>
            </fieldset>

            <div className="form-group">

              <Col xs={12}>
                <button
                  type="submit"
                  value="Submit"
                  className="btn btn-primary pull-right"
                >
                  Save
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
