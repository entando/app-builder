import React from 'react';
import PropTypes from 'prop-types';
import InternalPage from 'ui/internal-page/InternalPage';
import { Grid, Row, Col, Button, OverlayTrigger, Popover } from 'patternfly-react';

import { FormattedMessage } from 'react-intl';
import 'sass/widget-list-page/WidgetListPage.scss';

const WIDGET_HELP = 'widget.list.help';

const popover = () => (
  <Popover id="popover-admin-app-switch" title="">
    <p>
      <FormattedMessage id={WIDGET_HELP} />
    </p>
  </Popover>
);


const WidgetListPage = ({ onClickCreate }) => {
  const onClickAdd = (ev) => {
    ev.preventDefault();
    onClickCreate();
  };
  return (
    <InternalPage className="WidgetListPage">
      <div className="WidgetListPage__header">
        <h1>
          <span><FormattedMessage id="widget.list.title" /></span>
          <span className="pull-right">
            <OverlayTrigger
              overlay={popover()}
              placement="left"
              trigger={['click']}
              rootClose
            >
              <i className="fa pficon-help" />
            </OverlayTrigger>
          </span>
        </h1>
      </div>
      <Grid>
        <Row>
          <Col md={12}>
            <Button
              type="button"
              className="pull-right"
              bsStyle="primary"
              onClick={onClickAdd}
            >
              <FormattedMessage
                id="widget.list.new"
              />
            </Button>
            <Col md={12} className="WidgetListPage__tables">
              <h3><FormattedMessage id="widget.list.type" defaultMessage="" /></h3>
              <h1>TABLES</h1>

            </Col>
          </Col>
        </Row>
      </Grid>
    </InternalPage>

  );
};

WidgetListPage.propTypes = {
  onClickCreate: PropTypes.func,
};

WidgetListPage.defaultProps = {
  onClickCreate: () => {},
};


export default WidgetListPage;
