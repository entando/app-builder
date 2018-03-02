import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Alert, OverlayTrigger, Popover } from 'patternfly-react';
import { Panel } from 'react-bootstrap';

import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import RenderRadioInput from 'ui/common/form/RenderRadioInput';
import RenderSwitchInput from 'ui/common/form/RenderSwitchInput';

const BASE_URL_TYPES = [
  {
    id: 'relative',
    label: 'Relative',
  },
  {
    id: 'request',
    label: 'Built by HTTP request parameters',
  },
  {
    id: 'static',
    label: 'Static',
  },
];

const TREE_STYLE_PAGE = [
  {
    id: 'classic',
    label: 'Classic',
  },
  {
    id: 'request',
    label: 'Loads node on Demand',
  },
];

const URL_STYLE = [
  {
    id: 'classic',
    label: 'Classic',
  },
  {
    id: 'breadcrumbs',
    label: 'Breadcrumbs',
  },
];


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

export class PageSettingsBody extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const onSubmit = (ev) => {
      ev.preventDefault();
      this.props.handleSubmit();
    };

    const selectOptions = this.props.options.map(item => ({
      value: item.pageCode,
      text: item.shortFullTitle,
    }));

    return (
      <form onSubmit={onSubmit} className="form-horizontal">
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <RenderSelectInput
                options={selectOptions}
                labelId="PageSettings.input.homepage"
                fieldName="homePageCode"
                mandatory
              />
              <RenderSelectInput
                options={selectOptions}
                labelId="PageSettings.input.500"
                fieldName="errorPageCode"
                mandatory
              />
              <RenderSelectInput
                options={selectOptions}
                labelId="PageSettings.input.proceed"
                fieldName="loginPageCode"
                mandatory
              />
              <RenderSelectInput
                options={selectOptions}
                labelId="PageSettings.input.404"
                fieldName="notFoundPageCode"
                mandatory
              />
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
                  <Field
                    component={RenderSwitchInput}
                    name="baseUrlContext"
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
                  <Field
                    component={RenderSwitchInput}
                    name="useJsessionId"
                  />
                </Col>
              </div>

              <div className="form-group">
                <Col xs={2} className="text-right">
                  <FormattedMessage id="PageSettings.input.languageBroswer" />&nbsp;
                </Col>
                <Col xs={4}>
                  <Field
                    component={RenderSwitchInput}
                    name="startLangFromBrowser"
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
                  <label htmlFor="2" >
                    <Field
                      component={RenderRadioInput}
                      toggleElement={TREE_STYLE_PAGE}
                      name="treeStyle_page"
                    />
                  </label>
                </Col>
                <Col xs={2} className="text-right">
                  <FormattedMessage id="PageSettings.input.pageTreeStyle.url" />
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
    );
  }
}

PageSettingsBody.propTypes = {
  onWillMount: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    pageCode: PropTypes.string,
    shortFullTitle: PropTypes.string,
  })),
};

PageSettingsBody.defaultProps = {
  onWillMount: () => {},
  invalid: false,
  submitting: false,
  options: [],
};

const PageSettingsForm = reduxForm({
  form: 'settings',
})(PageSettingsBody);

export default PageSettingsForm;
