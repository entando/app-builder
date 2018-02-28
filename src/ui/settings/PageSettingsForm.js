import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Alert, OverlayTrigger, Popover } from 'patternfly-react';
import { Panel } from 'react-bootstrap';

import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
// import { required, widgetCode, maxLength } from 'util/validateForm';
import RenderSelectInput from 'ui/form/RenderSelectInput';
import RenderRadioInput from 'ui/form/RenderRadioInput';
import RenderSwitchInput from 'ui/form/RenderSwitchInput';


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
                options={['Home', '[i].. / Service', '.. / .. / Page not found']}
                labelId="PageSettings.input.homepage"
                mandatory
              />
              <RenderSelectInput
                options={['Home', '[i].. / Service', '.. / .. / Page not found']}
                labelId="PageSettings.input.500"
                mandatory
              />
              <RenderSelectInput
                options={['Home', '[i].. / Service', '.. / .. / Page not found']}
                labelId="PageSettings.input.proceed"
                mandatory
              />
              <RenderSelectInput
                options={['Home', '[i].. / Service', '.. / .. / Page not found']}
                labelId="PageSettings.input.404"

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
                      toggleElement={[
                        {
                          id: '1',
                          label: 'Relative',
                        },
                        {
                          id: '2',
                          label: 'Built by HTTP request parameters',
                        },
                        {
                          id: '3',
                          label: 'Static',
                        },
                        ]
                      }
                      name="test"
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
                    name="switch1"
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
                    name="switch2"
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
                    name="switch3"
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
                      toggleElement={[
                        {
                          id: '4',
                          label: 'Classic',
                        },
                        {
                          id: '5',
                          label: 'Loads node on Demand',
                        },
                        ]
                      }
                      name="test2"
                    />
                  </label>
                </Col>
                <Col xs={2} className="text-right">
                  <FormattedMessage id="PageSettings.input.pageTreeStyle.url" />
                </Col>
                <Col xs={4}>
                  <Field
                    component={RenderRadioInput}
                    toggleElement={[
                      {
                        id: '6',
                        label: 'Classic',
                      },
                      {
                        id: '7',
                        label: 'Breadcrumbs',
                      },
                      ]
                    }
                    name="test3"
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
};

PageSettingsBody.defaultProps = {
  onWillMount: () => {},
  invalid: false,
  submitting: false,
};

const PageSettingsForm = reduxForm({
  form: 'settings',
})(PageSettingsBody);

export default PageSettingsForm;
