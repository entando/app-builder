import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { Grid, Row, Col, Breadcrumb, Button } from 'patternfly-react';
import { Panel, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import SelectedPageInfoTableContainer from 'ui/pages/common/SelectedPageInfoTableContainer';
import { ROUTE_PAGE_CONFIG, ROUTE_WIDGET_EDIT } from 'app-init/router';
import { routeConverter } from '@entando/utils';
import WidgetConfigRenderer from 'ui/widgets/config/renderers/WidgetConfigRenderer';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';
import { APP_TOUR_STARTED } from 'state/app-tour/const';

class WidgetConfigPage extends Component {
  constructor(props) {
    super(props);
    this.toggleInfoTable = this.toggleInfoTable.bind(this);
    this.state = {
      infoTableOpen: false,
    };
    this.configFormRef = React.createRef(null);
  }

  componentDidMount() {
    if (this.props.onDidMount) this.props.onDidMount(this.props);
  }

  componentWillUnmount() {
    if (this.props.onWillUnmount) this.props.onWillUnmount(this.props);
  }

  toggleInfoTable() {
    this.setState({
      infoTableOpen: !this.state.infoTableOpen,
    });
  }

  render() {
    const {
      widget, widgetCode, widgetConfig, framePos, frameName, pageCode, onSubmit, history,
      appTourProgress, onCancel, onDiscard, intl, dirty, submitting, invalid,
      beforeSubmit, formId, formWidgetConfig, isMfe,
    } = this.props;

    const isReadOnly = widget && widget.readonlyPageWidgetConfig;

    const handleCancelClick = () => {
      if (dirty && appTourProgress !== APP_TOUR_STARTED) {
        onCancel();
      } else {
        onDiscard();
      }
    };

    const handleSubmit = () => {
      onSubmit({
        widgetConfig: formWidgetConfig, formId, beforeSubmit, isMfe, widget,
      });
    };

    return (
      <InternalPage className="WidgetConfigPage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.pageDesigner" />
                </BreadcrumbItem>
                <BreadcrumbItem to={routeConverter(ROUTE_PAGE_CONFIG, { pageCode })}>
                  <FormattedMessage id="menu.pageConfig" />
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <FormattedMessage id="menu.widget" />
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <PageTitle titleId="menu.widget" helpId="widgetConfig.help" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ErrorsAlertContainer />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button
                className="WidgetConfigPage__info-btn"
                bsStyle="primary"
                onClick={this.toggleInfoTable}
              >
                <span className="icon fa fa-chevron-down" />
                <FormattedMessage id="app.info" />
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Panel
                className="PageConfigPage__info-panel"
                id="collapsible-info-table"
                expanded={this.state.infoTableOpen}
                onToggle={() => { }}
              >
                <Panel.Collapse>
                  <SelectedPageInfoTableContainer />
                </Panel.Collapse>
              </Panel>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Panel>
                <Panel.Heading>
                  <Label>{framePos}</Label>
                  &nbsp;
                  <span>{frameName}</span>
                </Panel.Heading>
                {
                  isReadOnly &&
                  <div className="PageConfigPage__readonly-warning alert alert-warning">
                    <Row>
                      <Col xs={8}>
                        <span className="pficon pficon-warning-triangle-o" />
                        {' '}
                        <FormattedMessage id="widget.page.config.readOnlyMessage" />
                      </Col>
                      <Col xs={4} className="text-right">
                        <Link to={routeConverter(ROUTE_WIDGET_EDIT, { widgetCode })}>
                          <Button
                            bsStyle="primary"
                            onClick={this.toggleInfoTable}
                          >
                            <FormattedMessage id="widget.page.config.goToConfig" />
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </div>
                }
                <Panel.Body className="PageConfigPage__panel-body">
                  <WidgetConfigRenderer
                    widget={widget}
                    widgetCode={widgetCode}
                    widgetConfig={widgetConfig}
                    framePos={framePos}
                    frameName={frameName}
                    pageCode={pageCode}
                    history={history}
                    ref={this.configFormRef}
                    onSubmit={onSubmit}
                  />
                  {
                    isReadOnly && <div className="PageConfigPage__block-ui" />
                  }
                </Panel.Body>
                {
                    isReadOnly &&
                    <div className="text-right PageConfigPage__ok-button">
                      <Link to={routeConverter(ROUTE_PAGE_CONFIG, { pageCode })}>
                        <Button
                          bsStyle="primary"
                          onClick={this.toggleInfoTable}
                        >
                          <FormattedMessage id="app.ok" />
                        </Button>
                      </Link>
                    </div>
                }
              </Panel>
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={12}>
              {
                !isReadOnly && (
                  <Fragment>
                    <Button
                      className="pull-right NavigationBarConfigForm__save-btn app-tour-step-16"
                      type="submit"
                      bsStyle="primary"
                      disabled={invalid || submitting}
                      onClick={handleSubmit}
                    >
                      <FormattedMessage id="app.save" />
                    </Button>
                    <Button
                      className="pull-right NavigationBarConfigForm__cancel-btn"
                      bsStyle="default"
                      onClick={handleCancelClick}
                    >
                      <FormattedMessage id="app.cancel" />
                    </Button>
                  </Fragment>
                )
              }
              <ConfirmCancelModalContainer
                contentText={intl.formatMessage({ id: 'app.confirmCancel' })}
                invalid={invalid}
                submitting={submitting}
                onSave={handleSubmit}
                onDiscard={onDiscard}
              />
            </Col>
          </Row>
        </Grid>
      </InternalPage>
    );
  }
}

WidgetConfigPage.propTypes = {
  onDidMount: PropTypes.func,
  onWillUnmount: PropTypes.func,
  widget: PropTypes.shape({}),
  widgetCode: PropTypes.string.isRequired,
  widgetConfig: PropTypes.shape({}),
  framePos: PropTypes.number.isRequired,
  frameName: PropTypes.string.isRequired,
  pageCode: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  history: PropTypes.shape({}).isRequired,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  appTourProgress: PropTypes.string,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  dirty: PropTypes.bool,
  beforeSubmit: PropTypes.func,
  formId: PropTypes.string,
  formWidgetConfig: PropTypes.shape({}),
  isMfe: PropTypes.bool,
};

WidgetConfigPage.defaultProps = {
  widget: null,
  widgetConfig: null,
  onDidMount: null,
  onWillUnmount: null,
  appTourProgress: '',
  dirty: false,
  invalid: true,
  submitting: false,
  beforeSubmit: null,
  formId: '',
  formWidgetConfig: {},
  isMfe: false,
};

export default WidgetConfigPage;
