import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'redux-form';
import { Col } from 'patternfly-react';
import AttributeListTableActions from 'ui/common/contenttype-attributes/AttributeListTableActions';

const AttributeListTable = ({
  attributes,
  onClickDelete,
  onMoveUp,
  onMoveDown,
  entityCode,
  routeToEdit,
  locale,
}) => {
  const renderTable = () => (
    <Col xs={10} xsOffset={2}>
      <table className="ContTypeAttributeListTable__table table table-striped table-bordered">
        <thead>
          <tr>
            <th className="ContTypeAttributeListTable__th-sm">
              <FormattedMessage id="cms.contenttype.form.code" />
            </th>
            <th className="ContTypeAttributeListTable__th-md">
              <FormattedMessage id="cms.contenttype.form.name" />
            </th>
            <th className="ContTypeAttributeListTable__th-sm">
              <FormattedMessage id="cms.contenttype.form.type" />
            </th>
            <th className="ContTypeAttributeListTable__th-md">
              <FormattedMessage id="cms.contenttype.form.roles" />
            </th>
            <th className="ContTypeAttributeListTable__th-xs text-center">
              <FormattedMessage id="cms.contenttype.form.mandatory" />
            </th>
            <th className="ContTypeAttributeListTable__th-xs text-center">
              <FormattedMessage id="cms.contenttype.form.filter" />
            </th>
            <th className="ContTypeAttributeListTable__th-xs text-center">
              <FormattedMessage id="cms.contenttype.form.actions" />
            </th>
          </tr>
        </thead>
        <tbody>
          <FieldArray
            attributes={attributes}
            onClickDelete={onClickDelete}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            entityCode={entityCode}
            locale={locale}
            routeToEdit={routeToEdit}
            name="attributes"
            component={AttributeListTableActions}
            rerenderOnEveryChange
          />
        </tbody>
      </table>
    </Col>
  );

  return <div className="ContTypeAttributeListTable">{attributes.length > 0 ? renderTable() : null}</div>;
};

AttributeListTable.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.shape({})),
  onClickDelete: PropTypes.func,
  onMoveUp: PropTypes.func,
  onMoveDown: PropTypes.func,
  entityCode: PropTypes.string,
  routeToEdit: PropTypes.string,
  locale: PropTypes.string,
};

AttributeListTable.defaultProps = {
  attributes: [],
  onClickDelete: null,
  onMoveUp: null,
  onMoveDown: null,
  entityCode: '',
  routeToEdit: '',
  locale: '',
};

export default AttributeListTable;
