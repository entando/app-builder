import React from 'react';
import PropTypes from 'prop-types';

import { Col } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import WidgetSectionTitle from 'ui/widgets/list/WidgetSectionTitle';
import WidgetListRow from 'ui/widgets/list/WidgetListRow';
import { withPermissionValues } from 'ui/auth/withPermissions';

export const WidgetListTableBody = ({
  title, widgetList, locale, onDelete, onEdit, onNewUserWidget, isSuperuser,
}) => {
  const renderRow = widgetList
    .map(item => (
      <WidgetListRow
        key={item.code}
        name={item.titles[locale]}
        code={item.code}
        used={item.used}
        onDelete={onDelete}
        onEdit={onEdit}
        onNewUserWidget={onNewUserWidget}
        hasConfig={item.hasConfig}
        isSuperuser={isSuperuser}
      />));

  return (
    <div className="WidgetListTable">
      <Col xs={12} className="WidgetListTable__tables">
        <WidgetSectionTitle
          title={<FormattedMessage id={`widget.list.section.${title}`} defaultMessage={title} />}
        />
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th width="40%"><FormattedMessage id="app.name" /></th>
              <th width="40%"><FormattedMessage id="app.code" /></th>
              <th className="text-center" width="10%"><FormattedMessage id="app.used" /></th>
              {isSuperuser && (
                <th className="text-center" width="10%"><FormattedMessage id="app.actions" /></th>
              )}
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

WidgetListTableBody.propTypes = {
  title: PropTypes.string.isRequired,
  widgetList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  locale: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onNewUserWidget: PropTypes.func.isRequired,
  isSuperuser: PropTypes.bool,
};

WidgetListTableBody.defaultProps = {
  isSuperuser: true,
};

export default withPermissionValues(WidgetListTableBody);
