import React from 'react';

import PropTypes from 'prop-types';
import { Col } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import WidgetSectionTitle from 'ui/widgets/list/WidgetSectionTitle';
import WidgetListRow from 'ui/widgets/list/WidgetListRow';

const WidgetListTable = ({
  title, widgetList, locale, onDelete,
}) => {
  const renderRow = widgetList
    .map(item => (
      <WidgetListRow
        key={item.code}
        name={item.titles[locale]}
        code={item.code}
        used={item.used}
        onDelete={onDelete}
      />));

  return (
    <div className="WidgetListTable">
      <Col xs={12} className="WidgetListTable__tables">
        <WidgetSectionTitle title={title} />
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th width="40%"><FormattedMessage id="app.name" /></th>
              <th width="40%"><FormattedMessage id="app.code" /></th>
              <th className="text-center" width="10%"><FormattedMessage id="app.used" /></th>
              <th className="text-center" width="10%"><FormattedMessage id="app.actions" /></th>
            </tr>
          </thead>
          <tbody>
            {renderRow}
          </tbody>
        </table>
      </Col>
    </div>
  );
};

WidgetListTable.propTypes = {
  title: PropTypes.string.isRequired,
  widgetList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  locale: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default WidgetListTable;
