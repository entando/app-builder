import React from 'react';

import PropTypes from 'prop-types';
import { Col } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import 'sass/widget-list-page/WidgetListTable.scss';


const WidgetListTable = ({ children }) => (

  <div className="WidgetListTable">
    <Col md={12} className="WidgetListTable__tables">
      <div className="WidgetListTable__type">
        <h3><FormattedMessage id="widget.list.type" defaultMessage="" /></h3>
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th><FormattedMessage id="app.name" /></th>
            <th><FormattedMessage id="app.code" /></th>
            <th><FormattedMessage id="app.used" /></th>
            <th><FormattedMessage id="app.actions" /></th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </Col>
  </div>
);

WidgetListTable.propTypes = {
  children: PropTypes.node,
};

WidgetListTable.defaultProps = {
  children: null,
};

export default WidgetListTable;
