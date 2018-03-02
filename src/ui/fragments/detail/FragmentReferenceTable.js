import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Table } from 'react-bootstrap';
import { DropdownKebab, MenuItem, Row, Col } from 'patternfly-react';
import EmptyData from 'ui/fragments/detail/EmptyData';


const FragmentReferenceTable = ({ fragments, referencesFragments }) => {
  const onEdit = item => (ev) => {
    ev.preventDefault();
    referencesFragments(item);
  };

  if (fragments.length === 0) {
    return (<EmptyData messageId="fragment.detail.emptyReferenceFragments" />);
  }
  return (
    <div>
      <Table bordered hover className="FragmentReferenceTable">
        <thead>
          <tr>
            <th
              width="95%"
            >
              <FormattedMessage id="app.code" />
            </th>
            <th
              width="5%"
              className="text-center"
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
                  <DropdownKebab key={item.code} id={item.code} pullRight>
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
      <Row>
        <Col xs={12}>
          <div
            className="FragmentReferenceTable__div-search content-view-pf-pagination clearfix"
          >
            <div className="form-group">
              <span>
                <FormattedMessage
                  id="app.search.returned"
                  values={{ value: fragments.length }}
                />
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </div>

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
