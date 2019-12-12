import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb, Button } from 'patternfly-react';
import { Panel, Label } from 'react-bootstrap';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import SelectedPageInfoTableContainer from 'ui/pages/common/SelectedPageInfoTableContainer';
import { ROUTE_PAGE_CONFIG } from 'app-init/router';
import TaskListConfig from 'ui/pages/config/TaskListConfig';

class TaskListConfigContainer extends Component {
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
    const { framePos, pageCode, widgetCode } = this.props.location.state;

    return (
      <InternalPage className="WidgetConfigPage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.pageDesigner" />
                </BreadcrumbItem>
                <BreadcrumbItem to={ROUTE_PAGE_CONFIG} params={{ pageCode }}>
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
                bsStyle="default"
                onClick={this.toggleInfoTable}
              >
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
          <Row>
            <Col xs={12}>
              <Panel>
                <Panel.Heading>
                  <Label>{framePos}</Label>
                  &nbsp;
                  <span>{pageCode}</span>
                </Panel.Heading>
                <Panel.Body>
                  <TaskListConfig framePos={framePos} pageCode={pageCode} widgetCode={widgetCode} />
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </InternalPage>
    );
  }
}

TaskListConfigContainer.propTypes = {
  onDidMount: PropTypes.func,
  onWillUnmount: PropTypes.func,
  location: PropTypes.shape({
    state: PropTypes.shape({
      framePos: PropTypes.number.isRequired,
      widgetCode: PropTypes.string.isRequired,
      pageCode: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

TaskListConfigContainer.defaultProps = {
  onDidMount: null,
  onWillUnmount: null,
};

export default TaskListConfigContainer;
