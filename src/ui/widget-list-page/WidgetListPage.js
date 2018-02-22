import React from 'react';
import PropTypes from 'prop-types';
import InternalPage from 'ui/internal-page/InternalPage';
import WidgetListTable from 'ui/widget-list-page/WidgetListTable';
import WidgetListRow from 'ui/widget-list-page/WidgetListRow';

import { Row, Col, Button, OverlayTrigger, Popover } from 'patternfly-react';

import { FormattedMessage } from 'react-intl';
import 'sass/widget-list-page/WidgetListPage.scss';

const WIDGET_HELP = 'widget.help';

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
    alert('Gianni');
  };
  const fetchWidgetList = () => {
    console.log('fetch widget list');
  };

  return (
    <InternalPage className="WidgetListPage">
      {fetchWidgetList()}
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
              <i className="WidgetListPage__icon fa pficon-help" />
            </OverlayTrigger>
          </span>
        </h1>
      </div>
      <div>
        <Row>
          <Col md={12} className="">
            <Button
              type="button"
              className="pull-right WidgetListPage__add"
              bsStyle="primary"
              onClick={onClickAdd}
            >
              <FormattedMessage
                id="widget.list.new"
              />
            </Button>
            <WidgetListTable >
              <WidgetListRow />
            </WidgetListTable>

          </Col>
        </Row>
      </div>
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
