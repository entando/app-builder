import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Table } from 'react-bootstrap';
import EmptyData from 'ui/fragments/detail/EmptyData';

const WidgetTypeReferenceTable = ({ widgetType }) => {
  if (!widgetType) {
    return (<EmptyData messageId="fragment.detail.emptyReferenceWidgetTypes" />);
  }

  return (
    <Table bordered hover className="WidgetTypeReferenceTable">
      <thead>
        <tr>
          <th
            width="50%"
          >
            <FormattedMessage id="app.title" />
          </th>
          <th
            width="50%"
          >
            <FormattedMessage id="app.code" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr key={widgetType.code} >
          <td >{widgetType.title} </td>
          <td >{widgetType.code} </td>
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
  widgetType: null,
};

export default WidgetTypeReferenceTable;
