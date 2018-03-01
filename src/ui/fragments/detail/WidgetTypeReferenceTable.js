import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Table } from 'react-bootstrap';

const WidgetTypeReferenceTable = ({ widgetType }) => (

  <Table bordered hover className="FragmentReferenceTable">
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
