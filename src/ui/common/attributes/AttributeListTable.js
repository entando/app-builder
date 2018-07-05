import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'redux-form';
import { Col } from 'patternfly-react';
import AttributeListTableActions from 'ui/common/attributes/AttributeListTableActions';

const AttributeListTable = (props) => {
  const {
    attributes,
  } = props;

  const renderTable = () => (
    <Col xs={10} xsOffset={2}>
      <table className="AttributeListTable__table table table-striped table-bordered">
        <thead>
          <tr>
            <th className="AttributeListTable__th-md">
              <FormattedMessage id="app.code" />
            </th>
            <th className="AttributeListTable__th-sm">
              <FormattedMessage id="app.type" />
            </th>
            <th className="AttributeListTable__th-md">
              <FormattedMessage id="app.roles" />
            </th>
            <th className="AttributeListTable__th-xs text-center">
              <FormattedMessage id="app.mandatory" />
            </th>
            <th className="AttributeListTable__th-xs text-center">
              <FormattedMessage id="app.filter" />
            </th>
            <th className="AttributeListTable__th-xs text-center">
              <FormattedMessage id="app.actions" />
            </th>
          </tr>
        </thead>
        <tbody>
          <FieldArray
            {...props}
            name="attributes"
            attributes={attributes}
            component={AttributeListTableActions}
            rerenderOnEveryChange
          />
        </tbody>
      </table>
    </Col>
  );

  return (
    <div className="AttributeListTable">
      {attributes.length > 0 ? renderTable() : null}
    </div>
  );
};

AttributeListTable.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.shape({})),
};

AttributeListTable.defaultProps = {
  attributes: [],
};

export default AttributeListTable;
