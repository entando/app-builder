import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Table } from 'react-bootstrap';
import { DropdownKebab, MenuItem } from 'patternfly-react';

const FragmentReferenceTable = ({ fragments, referencesFragments }) => (

  <Table bordered hover className="DetailFragmentPage__table">
    <thead>
      <tr>
        <th
          width="95%"
          className="DetailFragmentPage__table-th"
        >
          <FormattedMessage id="app.name" />
        </th>
        <th
          width="5%"
          className="DetailFragmentPage__table-th DetailFragmentPage__th-actions"
        >
          <FormattedMessage id="app.actions" />
        </th>

      </tr>
    </thead>
    <tbody>
      {
        fragments.map(item => (
          <tr key={item.code} >
            <td key={item.code}>{item.code} </td>
            <td key={item.code} className="text-center">
              <DropdownKebab key={item.code} id={item.code}>
                <MenuItem
                  onClick={referencesFragments(item)}
                ><FormattedMessage id="app.edit" />
                </MenuItem>
              </DropdownKebab>
            </td>
          </tr>
        ))
      }
    </tbody>
  </Table>
);

FragmentReferenceTable.propTypes = {
  referencesFragments: PropTypes.func,
  fragments: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
  })),
};

FragmentReferenceTable.defaultProps = {
  referencesFragments: () => {},
  fragments: [],
};

export default FragmentReferenceTable;
