import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Table } from 'react-bootstrap';
import { Button } from 'patternfly-react';


const DetailFragmentTable = ({
  handleEdit, code, title, pluginCode,
}) => (
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
            {title || ''}
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
      onClick={() => handleEdit(code)}
      bsStyle="primary"
    >
      <FormattedMessage id="app.edit" />
    </Button>
  </div>
);

DetailFragmentTable.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  code: PropTypes.string,
  title: PropTypes.string,
  pluginCode: PropTypes.string,
};

DetailFragmentTable.defaultProps = {
  code: null,
  title: null,
  pluginCode: null,

};


export default DetailFragmentTable;
