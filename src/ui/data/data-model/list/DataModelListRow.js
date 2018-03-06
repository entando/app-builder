import React from 'react';
import PropTypes from 'prop-types';
import WidgetListMenuActions from 'ui/widgets/list/WidgetListMenuActions';
import { Link } from 'frontend-common-components';
import { ROUTE_WIDGET_EDIT } from 'app-init/router';

const DataModelListRow = (props) => {
  const { descr, type, modelId } = props;
  return (
    <tr className="DataModelListRow">
      <td className="DataModelListRow__td">
        <div className="list-view-pf-left">
          <Link route={ROUTE_WIDGET_EDIT} params={{ widgetCode: type }} >{descr}</Link>
        </div>
      </td>
      <td className="DataModelListRow__td ">{descr}</td>
      <td className="DataModelListRow__td text-center">{type}</td>
      <td className="DataModelListRow__td text-center">{modelId}</td>
      <td className="DataModelListRow__td text-center"><WidgetListMenuActions /></td>
    </tr>
  );
};

DataModelListRow.propTypes = {
  type: PropTypes.string.isRequired,
  descr: PropTypes.string.isRequired,
  modelId: PropTypes.string.isRequired,
};

export default DataModelListRow;
