import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Table } from 'react-bootstrap';
import { DropdownKebab, MenuItem, Row, Col } from 'patternfly-react';

const PageModelReferenceTable = ({ pageModel, referencesPageModels }) => {
  const onEdit = item => (ev) => {
    ev.preventDefault();
    referencesPageModels(item);
  };

  return (
    <div>
      <Table bordered hover className="PageModelReferenceTable">
        <thead>
          <tr>
            <th
              width="70%"
              className="PageModelReferenceTable__th"
            >
              <FormattedMessage id="app.code" />
            </th>
            <th
              width="25%"
              className="PageModelReferenceTable__th"
            >
              <FormattedMessage id="app.name" />
            </th>
            <th
              width="5%"
              className="PageModelReferenceTable__th text-center"
            >
              <FormattedMessage id="app.actions" />
            </th>

          </tr>
        </thead>
        <tbody>
          {
            pageModel.map(item => (
              <tr key={item.code} >
                <td >{item.code} </td>
                <td >{item.name} </td>
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
      <Row>
        <Col xs={12}>
          <div className="PageModelReferenceTable__div-search content-view-pf-pagination clearfix">
            <div className="form-group">
              <span>
                <FormattedMessage id="app.search.returned" values={{ value: pageModel.length }} />
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

PageModelReferenceTable.propTypes = {
  referencesPageModels: PropTypes.func,
  pageModel: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
  })),
};

PageModelReferenceTable.defaultProps = {
  referencesPageModels: () => {},
  pageModel: [],
};

export default PageModelReferenceTable;
