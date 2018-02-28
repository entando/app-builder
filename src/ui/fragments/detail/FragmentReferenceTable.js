import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Table } from 'react-bootstrap';
import { DropdownKebab, MenuItem } from 'patternfly-react';


const FragmentReferenceTable = ({ fragments, referencesFragments }) => {
  const onEdit = item => (ev) => {
    ev.preventDefault();
    referencesFragments(item);
  };
  return (

    <Table bordered hover className="FragmentReferenceTable">
      <thead>
        <tr>
          <th
            width="95%"
            className="FragmentReferenceTable__th"
          >
            <FormattedMessage id="app.code" />
          </th>
          <th
            width="5%"
            className="FragmentReferenceTable__th text-center"
          >
            <FormattedMessage id="app.actions" />
          </th>

        </tr>
      </thead>
      <tbody>
        {
          fragments.map(item => (
            <tr key={item.code} >
              <td >{item.code} </td>
              <td className="text-center">
                <DropdownKebab key={item.code} id={item.code}>
                  <MenuItem
                    onClick={onEdit(item)}
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
};

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
