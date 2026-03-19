import { get } from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, defineMessages } from 'react-intl';
import { Grid, Row, Col, Breadcrumb, Button, OverlayTrigger } from 'patternfly-react';
import { Panel, Tooltip } from 'react-bootstrap';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import SelectedPageInfoTableContainer from 'ui/pages/common/SelectedPageInfoTableContainer';
import { ROUTE_PAGE_CONFIG } from 'app-init/router';
import { routeConverter } from '@entando/utils';
import getAppBuilderWidgetForm from 'helpers/getAppBuilderWidgetForm';
import { isMicrofrontendWidgetForm } from 'helpers/microfrontends';
import { isLegacyWidget, buildLegacyConfigUrl } from 'helpers/legacyWidget';
import WidgetConfigMicrofrontend from 'ui/widgets/config/WidgetConfigMicrofrontend';
import WidgetConfigPanel from 'ui/widgets/config/WidgetConfigPanel';
import WidgetConfigPortal from 'ui/widgets/config/WidgetConfigPortal';

const msgs = defineMessages({
  widgetConfigError: {
    id: 'widget.page.config.error',
    defaultMessage: 'Unable to load widget configuration',
  },
});

function removeActionsButton(wrapper) {
  const saveButton = wrapper.querySelectorAll('[class*=save]')[0];
  const cancelButton = wrapper.querySelectorAll('[class*=cancel]')[0];

  if (saveButton) {
    saveButton.remove();
  }

  if (cancelButton) {
    cancelButton.remove();
  }
}
class WidgetConfigPage extends Component {
  constructor(props) {
    super(props);
    this.toggleInfoTable = this.toggleInfoTable.bind(this);
    this.handleLegacyMessage = this.handleLegacyMessage.bind(this);
    this.legacyIframeRef = null;
    this.state = {
      infoTableOpen: false,
    };
  }

  componentDidMount() {
    if (this.props.onDidMount) this.props.onDidMount(this.props);
    window.addEventListener('message', this.handleLegacyMessage);
  }

  componentDidUpdate() {
    const { widget, intl } = this.props;
    const isReadOnly = widget && widget.readonlyDefaultConfig;
    const wrapper = document.getElementsByClassName('panel-body')[0];
    if (wrapper && wrapper.hasChildNodes()
      && wrapper.innerText !== intl.formatMessage(msgs.widgetConfigError) && isReadOnly) {
      removeActionsButton(wrapper);
    }
  }

  componentWillUnmount() {
    if (this.props.onWillUnmount) this.props.onWillUnmount(this.props);
    window.removeEventListener('message', this.handleLegacyMessage);
  }

  handleLegacyMessage(event) {
    if (!event.data) return;
    if (event.data.type === 'entando.widgetConfigSaved') {
      const { onLegacySave, pageCode } = this.props;
      if (onLegacySave) {
        onLegacySave(pageCode);
      }
    }
    if (event.data.type === 'entando.legacyConfigResize' && this.legacyIframeRef) {
      this.legacyIframeRef.style.height = `${event.data.height}px`;
    }
  }

  toggleInfoTable() {
    this.setState({
      infoTableOpen: !this.state.infoTableOpen,
    });
  }

  render() {
    const {
      widget, widgetCode, widgetConfig, framePos, frameName, pageCode,
      onSubmit, intl, history, onCancel,
    } = this.props;

    const parameters = get(widget, 'parameters', []);

    const renderWidgetConfigForm = () => {
      const appBuilderWidgetForm = getAppBuilderWidgetForm(widget);
      if (appBuilderWidgetForm) {
        return (
          <WidgetConfigPanel
            widget={widget}
            widgetCode={widgetCode}
            framePos={framePos}
            frameName={frameName}
            pageCode={pageCode}
          >
            {
              React.createElement(
                appBuilderWidgetForm,
                {
                  widgetConfig,
                  widgetCode,
                  pageCode,
                  frameId: framePos,
                  intl,
                  history,
                  parameters,
                }, null,
              )
            }
          </WidgetConfigPanel>
        );
      }
      if (isLegacyWidget(widget)) {
        const legacyUrl = buildLegacyConfigUrl(widget, pageCode, framePos);
        return (
          <Row>
            <Col xs={12}>
              <WidgetConfigPortal>
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="legacy-save-tooltip">
                      <FormattedMessage id="widget.page.config.legacySaveTooltip" />
                    </Tooltip>
                  }
                >
                  <span className="pull-right">
                    <Button
                      className="WidgetConfigPage__save-btn"
                      bsStyle="primary"
                      disabled
                    >
                      <FormattedMessage id="app.save" />
                    </Button>
                  </span>
                </OverlayTrigger>
                <Button
                  className="pull-right WidgetConfigPage__cancel-btn"
                  onClick={onCancel}
                >
                  <FormattedMessage id="app.cancel" />
                </Button>
              </WidgetConfigPortal>
              <iframe
                title="Legacy Widget Configuration"
                src={legacyUrl}
                className="WidgetConfigPage__legacy-iframe"
                ref={(el) => { this.legacyIframeRef = el; }}
              />
            </Col>
          </Row>
        );
      }
      if (isMicrofrontendWidgetForm(widget)) {
        return (
          <WidgetConfigMicrofrontend
            widget={widget}
            widgetConfig={widgetConfig}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
        );
      }
      return <FormattedMessage id="widget.page.config.error" />;
    };

    return (
      <InternalPage className="WidgetConfigPage">
        <div className="WidgetConfigPage__header">
          <div className="WidgetConfigPage__top">
            <div>
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
            </div>
            <div>
              <div id="widget-button-holder" />
            </div>
          </div>
          <div>
            <PageTitle titleId="menu.widget" helpId="widgetConfig.help" />
          </div>
        </div>

        <div className="WidgetConfigPage__body">
          <Grid fluid>
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
                  onToggle={() => {}}
                >
                  <Panel.Collapse>
                    <SelectedPageInfoTableContainer />
                  </Panel.Collapse>
                </Panel>
              </Col>
            </Row>
            {renderWidgetConfigForm()}
          </Grid>
        </div>
      </InternalPage>
    );
  }
}

WidgetConfigPage.propTypes = {
  onDidMount: PropTypes.func,
  onWillUnmount: PropTypes.func,
  widget: PropTypes.shape({
    readonlyDefaultConfig: PropTypes.bool,
  }),
  widgetCode: PropTypes.string.isRequired,
  widgetConfig: PropTypes.shape({}),
  framePos: PropTypes.number.isRequired,
  frameName: PropTypes.string.isRequired,
  pageCode: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onLegacySave: PropTypes.func,
  intl: intlShape.isRequired,
  history: PropTypes.shape({}).isRequired,
};

WidgetConfigPage.defaultProps = {
  widget: null,
  widgetConfig: null,
  onDidMount: null,
  onWillUnmount: null,
  onLegacySave: null,
};

export default WidgetConfigPage;
