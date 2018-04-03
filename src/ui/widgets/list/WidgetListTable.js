import React from 'react';

import PropTypes from 'prop-types';
import { Col, Spinner } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import WidgetSectionTitle from 'ui/widgets/list/WidgetSectionTitle';
import { formattedText } from 'frontend-common-components';

const WidgetListTable = ({ children, loading }) => (

  <div className="WidgetListTable">
    <Spinner loading={!!loading}>
      <Col xs={12} className="WidgetListTable__tables">
        <WidgetSectionTitle title={formattedText('widget.list.type')} />
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th><FormattedMessage id="app.name" /></th>
              <th><FormattedMessage id="app.code" /></th>
              <th className="text-center" width="10%"><FormattedMessage id="app.used" /></th>
              <th className="text-center" width="10%"><FormattedMessage id="app.actions" /></th>
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      </Col>
    </Spinner>
  </div>
);

WidgetListTable.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
};

WidgetListTable.defaultProps = {
  children: null,
  loading: false,
};

export default WidgetListTable;
