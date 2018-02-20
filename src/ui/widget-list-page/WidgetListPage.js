import React from 'react';
import PropTypes from 'prop-types';
import InternalPage from 'ui/internal-page/InternalPage';
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
            <Col md={12} className="WidgetListPage__tables">
              <h3><FormattedMessage id="widget.list.type" defaultMessage="" /></h3>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>lando</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Larry the Bird</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </Col>
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
