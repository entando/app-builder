import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Button } from 'patternfly-react';
import { Panel, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { ROUTE_PAGE_CONFIG, ROUTE_WIDGET_EDIT } from 'app-init/router';
import { routeConverter } from '@entando/utils';
import WidgetConfigPortal from 'ui/widgets/config/WidgetConfigPortal';

const WidgetConfigPanel = ({
  widget, widgetCode, framePos, frameName, pageCode, children, buttons,
}) => {
  const isReadOnly = widget && widget.readonlyDefaultConfig;

  return (
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
            {children}
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
        <WidgetConfigPortal>
          {buttons}
        </WidgetConfigPortal>
      </Col>
    </Row>
  );
};

WidgetConfigPanel.propTypes = {
  widget: PropTypes.shape({
    readonlyDefaultConfig: PropTypes.bool,
  }),
  widgetCode: PropTypes.string.isRequired,
  widgetConfig: PropTypes.shape({}),
  framePos: PropTypes.number.isRequired,
  frameName: PropTypes.string.isRequired,
  pageCode: PropTypes.string.isRequired,
  history: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
  buttons: PropTypes.node,
};

WidgetConfigPanel.defaultProps = {
  widget: null,
  widgetConfig: null,
  buttons: null,
};

export default WidgetConfigPanel;
