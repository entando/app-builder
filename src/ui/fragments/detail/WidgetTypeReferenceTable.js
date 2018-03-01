import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Table } from 'react-bootstrap';
import EmptyData from 'ui/fragments/detail/EmptyData';

const WidgetTypeReferenceTable = ({ widgetType }) => {
  if (Object.keys(widgetType).length === 0 && widgetType.constructor === Object) {
    return (<EmptyData messageId="fragment.detail.emptyReferenceWidgetTypes" />);
  }
  return (
    <Table bordered hover className="WidgetTypeReferenceTable">
      <thead>
        <tr>
          <th
            width="50%"
            className="WidgetTypeReferenceTable__th"
          >
            <FormattedMessage id="app.code" />
          </th>
          <th
            width="50%"
            className="WidgetTypeReferenceTable__th"
          >
            <FormattedMessage id="app.name" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr key={widgetType.code} >
          <td >{widgetType.code} </td>
          <td >{widgetType.title} </td>
        </tr>
      </tbody>
    </Table>
  );
};

WidgetTypeReferenceTable.propTypes = {
  widgetType: PropTypes.shape({
    code: PropTypes.string,
    title: PropTypes.string,
  }),
};

WidgetTypeReferenceTable.defaultProps = {
  widgetType: {},
};

export default WidgetTypeReferenceTable;
