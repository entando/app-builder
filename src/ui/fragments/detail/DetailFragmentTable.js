import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Table } from 'react-bootstrap';
import { Button } from 'patternfly-react';


const DetailFragmentTable = ({
  handleEdit, code, title, pluginCode,
}) => {
  const onEdit = (ev) => {
    ev.preventDefault();
    handleEdit(code);
  };
  return (
    <div className="DetailFragmentTable">
      <Table bordered >
        <tbody>
          <tr>
            <th className="td-pagetree-width" width="10%">
              <FormattedMessage id="app.code" />
            </th>
            <td>
              {code}
            </td>
          </tr>
          <tr>
            <th>
              <FormattedMessage id="fragment.detail.widgetType" />
            </th>
            <td>
              {title}
            </td>
          </tr>
          <tr>
            <th>
              <FormattedMessage id="fragment.detail.pluginCode" />
            </th>
            <td >
              {pluginCode}
            </td>
          </tr>
        </tbody>
      </Table>
      <Button
        className="pull-right"
        type="button"
        onClick={onEdit}
        bsStyle="primary"
      >
        <FormattedMessage id="app.edit" />
      </Button>
    </div>
  );
};

DetailFragmentTable.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  pluginCode: PropTypes.string.isRequired,
};


export default DetailFragmentTable;
