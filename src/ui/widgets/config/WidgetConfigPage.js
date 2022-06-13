import { get } from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, defineMessages } from 'react-intl';
import { Grid, Row, Col, Breadcrumb, Button } from 'patternfly-react';
import { Panel } from 'react-bootstrap';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import SelectedPageInfoTableContainer from 'ui/pages/common/SelectedPageInfoTableContainer';
import { ROUTE_PAGE_CONFIG } from 'app-init/router';
import { routeConverter } from '@entando/utils';
import getAppBuilderWidgetForm from 'helpers/getAppBuilderWidgetForm';
import { isMicrofrontendWidgetForm } from 'helpers/microfrontends';
import WidgetConfigMicrofrontend from 'ui/widgets/config/WidgetConfigMicrofrontend';
import WidgetConfigPanel from 'ui/widgets/config/WidgetConfigPanel';

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
    this.state = {
      infoTableOpen: false,
    };
  }

  componentDidMount() {
    if (this.props.onDidMount) this.props.onDidMount(this.props);
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
  intl: intlShape.isRequired,
  history: PropTypes.shape({}).isRequired,
};

WidgetConfigPage.defaultProps = {
  widget: null,
  widgetConfig: null,
  onDidMount: null,
  onWillUnmount: null,
};

export default WidgetConfigPage;
