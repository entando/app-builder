import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Table } from 'react-bootstrap';
import { DropdownKebab, MenuItem, Row, Col } from 'patternfly-react';
import EmptyData from 'ui/fragments/detail/EmptyData';

const PageTemplateReferenceTable = ({ pageTemplate, referencesPageTemplates }) => {
  if (pageTemplate.length === 0) {
    return (<EmptyData messageId="fragment.detail.emptyReferencePageTemplates" />);
  }
  return (
    <div>
      <Table bordered hover className="PageTemplateReferenceTable">
        <thead>
          <tr>
            <th
              width="70%"
            >
              <FormattedMessage id="app.code" />
            </th>
            <th
              width="25%"
            >
              <FormattedMessage id="app.name" />
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
            pageTemplate.map(item => (
              <tr key={item.code} >
                <td >{item.code} </td>
                <td >{item.name} </td>
                <td className="text-center">
                  <DropdownKebab key={item.code} id={item.code}>
                    <MenuItem
                      onClick={() => referencesPageTemplates(item)}
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
          <div className="PageTemplateReferenceTable__div-search content-view-pf-pagination clearfix">
            <div className="form-group">
              <span>
                <FormattedMessage id="app.search.returned" values={{ value: pageTemplate.length }} />
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

PageTemplateReferenceTable.propTypes = {
  referencesPageTemplates: PropTypes.func,
  pageTemplate: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
  })),
};

PageTemplateReferenceTable.defaultProps = {
  referencesPageTemplates: () => {},
  pageTemplate: [],
};

export default PageTemplateReferenceTable;
