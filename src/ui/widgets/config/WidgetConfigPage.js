import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { Grid, Row, Col, Breadcrumb, Button } from 'patternfly-react';
import { Panel, Label } from 'react-bootstrap';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import SelectedPageInfoTableContainer from 'ui/pages/common/SelectedPageInfoTableContainer';
import { ROUTE_PAGE_CONFIG } from 'app-init/router';
import { routeConverter } from '@entando/utils';
import getAppBuilderWidgetForm from 'helpers/getAppBuilderWidgetForrm';
import { isMicrofrontendWidgetForm } from 'helpers/microfrontends';
import WidgetConfigMicrofrontend from 'ui/widgets/config/WidgetConfigMicrofrontend';


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
      widget, widgetCode, widgetConfig, framePos, frameName, pageCode, onSubmit, intl, history,
    } = this.props;

    const renderWidgetConfigForm = () => {
      const appBuilderWidgetForm = getAppBuilderWidgetForm(widgetCode);
      if (appBuilderWidgetForm) {
        return React.createElement(
          appBuilderWidgetForm,
          {
            widgetConfig, widgetCode, pageCode, frameId: framePos, intl, history,
          },
          null,
        );
      }
      if (isMicrofrontendWidgetForm(widget)) {
        return (
          <WidgetConfigMicrofrontend
            widget={widget}
            widgetConfig={widgetConfig}
            onSubmit={onSubmit}
          />
        );
      }
      return <FormattedMessage id="widget.page.config.error" />;
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
                <Panel.Body>
                  {renderWidgetConfigForm()}
                </Panel.Body>
              </Panel>
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
};

WidgetConfigPage.defaultProps = {
  widget: null,
  widgetConfig: null,
  onDidMount: null,
  onWillUnmount: null,
};

export default WidgetConfigPage;
