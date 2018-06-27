import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import { InputGroup, Button, Col } from 'patternfly-react';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';
import AttributeListMenuActions from 'ui/common/attributes/AttributeListMenuActions';
import AttributeCheckIcon from 'ui/common/attributes/AttributeCheckIcon';
import DeleteAttributeModalContainer from 'ui/data-types/attributes/DeleteAttributeModalContainer';

import { TYPE_COMPOSITE } from 'state/data-types/const';

const AttributeListTableComposite = (props) => {
  const {
    attributes, attributesList, onAddAttribute, invalid, submitting,
  } = props;

  const renderTableRows = () => attributes.map((attribute, index) => {
    const isMovableUp = index > 0;
    const isMovableDown = index < attributes.length - 1;
    return (
      <tr key={attribute.code}>
        <td className="AttributeListRow__td">{attribute.code}</td>
        <td className="AttributeListRow__td">{attribute.type}</td>
        <td className="AttributeListRow__td text-center">
          <AttributeCheckIcon isChecked={attribute.mandatory} />
        </td>
        <td className="AttributeListRow__td text-center">
          <AttributeListMenuActions
            {...props}
            attributeIndex={index}
            isMovableUp={isMovableUp}
            isMovableDown={isMovableDown}
            code={attribute.code}
          />
        </td>
      </tr>
    );
  });

  const selectOptions = attributesList
    .filter(f => f !== TYPE_COMPOSITE)
    .map(item => ({
      value: item,
      text: item,
    }));

  const renderSelectOption = () => (
    <div>
      <legend>
        <FormattedMessage id="app.attributes" />
      </legend>
      <InputGroup>
        <Field
          component={RenderSelectInput}
          options={selectOptions}
          defaultOptionId="app.chooseAnOption"
          label={
            <FormLabel labelId="DataType.type" required />
              }
          name="type"
        />
        <span className="input-group-btn">
          <Button
            type="button"
            className="pull-right DataTypeForm__add"
            bsStyle="primary"
            onClick={() => onAddAttribute(props)}
            disabled={invalid || submitting}
          >
            <FormattedMessage
              id="app.add"
            />
          </Button>
        </span>
      </InputGroup>
    </div>
  );

  const renderTable = () => (
    <Col xs={10} xsOffset={2}>
      <table className="AttributeListTableComposite__table table table-striped table-bordered">
        <thead>
          <tr>
            <th className="AttributeListTableComposite__th-md">
              <FormattedMessage id="app.code" />
            </th>
            <th className="AttributeListTableComposite__th-sm">
              <FormattedMessage id="app.type" />
            </th>
            <th className="AttributeListTableComposite__th-xs text-center">
              <FormattedMessage id="app.mandatory" />
            </th>
            <th className="AttributeListTableComposite__th-xs text-center">
              <FormattedMessage id="app.actions" />
            </th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
    </Col>
  );

  return (
    <div className="AttributeListTableComposite">
      {renderSelectOption()}
      {attributes.length > 0 ? renderTable() : null}
      <DeleteAttributeModalContainer />
    </div>
  );
};

AttributeListTableComposite.propTypes = {
  attributesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  attributes: PropTypes.arrayOf(PropTypes.shape({})),
  onAddAttribute: PropTypes.func,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

AttributeListTableComposite.defaultProps = {
  attributes: [],
  onAddAttribute: () => {},
  invalid: false,
  submitting: false,

};

export default AttributeListTableComposite;
