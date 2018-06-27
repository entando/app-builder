import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, FieldArray } from 'redux-form';
import { InputGroup, Button, Col, DropdownKebab, MenuItem } from 'patternfly-react';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';
import AttributeCheckIcon from 'ui/common/attributes/AttributeCheckIcon';

import { TYPE_COMPOSITE } from 'state/data-types/const';

const AttributeListTableComposite = (props) => {
  const {
    attributesComposite, attributesList, onAddAttribute, onClickDelete, onMove, invalid, submitting,
  } = props;

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

  const renderAttributes = ({ compositeAttributes, fields }) =>
    compositeAttributes.map((attribute, index) => {
      const isMovableUp = index > 0;
      const isMovableDown = index < compositeAttributes.length - 1;
      return (
        <tr key={attribute.code}>
          <td className="AttributeListRow__td">{attribute.code}</td>
          <td className="AttributeListRow__td">{attribute.type}</td>
          <td className="AttributeListRow__td text-center">
            <AttributeCheckIcon isChecked={attribute.mandatory} />
          </td>
          <td className="AttributeListRow__td text-center">

            <DropdownKebab pullRight id={`${attribute.code}-actions`}>
              {
                isMovableUp ?
                  <MenuItem
                    className="AttributeListMenuAction__menu-item-move-up"
                    onClick={() => { onMove(index, index - 1); fields.move(index, index - 1); }}
                  >
                    <FormattedMessage id="app.moveUp" />
                  </MenuItem>
                : null
              }
              {
              isMovableDown ?
                <MenuItem
                  className="AttributeListMenuAction__menu-item-move-down"
                  onClick={() => { onMove(index, index + 1); fields.move(index, index + 1); }}
                >
                  <FormattedMessage id="app.moveDown" />
                </MenuItem>
              : null
            }

              <MenuItem
                className="AttributeListMenuAction__menu-item-delete"
                onClick={() => { fields.remove(index); onClickDelete(attribute.code); }}
              >
                <FormattedMessage id="app.delete" />
              </MenuItem>
            </DropdownKebab>

          </td>
        </tr>
      );
    });

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
          <FieldArray
            name="compositeAttributes"
            compositeAttributes={attributesComposite}
            component={renderAttributes}
            rerenderOnEveryChange
          />
        </tbody>
      </table>
    </Col>
  );

  return (
    <div className="AttributeListTableComposite">
      {renderSelectOption()}
      {attributesComposite.length > 0 ? renderTable() : null}
    </div>
  );
};

AttributeListTableComposite.propTypes = {
  attributesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  attributesComposite: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onAddAttribute: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

AttributeListTableComposite.defaultProps = {
  invalid: false,
  submitting: false,
};

export default AttributeListTableComposite;
