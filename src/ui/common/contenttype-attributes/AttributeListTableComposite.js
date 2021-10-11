import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, FieldArray } from 'redux-form';
import { InputGroup, Button, Col, DropdownKebab, MenuItem } from 'patternfly-react';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';
import AttributeCheckIcon from 'ui/common/contenttype-attributes/AttributeCheckIcon';

import { TYPE_COMPOSITE } from 'state/content-type/const';

const AttributeListTableComposite = (props) => {
  const {
    compositeAttributes,
    attributesList,
    onAddAttribute,
    onClickDelete,
    onMove,
    invalid,
    submitting,
    isMonolistCompositeType,
  } = props;
  const name = isMonolistCompositeType
    ? 'nestedAttribute.compositeAttributes'
    : 'compositeAttributes';
  const selectOptions = attributesList
    .filter(f => f !== TYPE_COMPOSITE)
    .map(item => ({
      value: item,
      text: item,
    }));

  const renderSelectOption = () => (
    <div>
      <legend>
        <FormattedMessage id="cms.contenttype.attributes.label" />
      </legend>
      <InputGroup>
        <Field
          component={RenderSelectInput}
          options={selectOptions}
          defaultOptionId="cms.label.chooseoption"
          label={<FormLabel labelId="cms.contenttype.form.type" required />}
          name="type"
        />
        <span className="input-group-btn">
          <Button
            type="button"
            className="pull-right ContentTypeForm__add"
            bsStyle="primary"
            onClick={() => onAddAttribute(props)}
            disabled={invalid || submitting}
          >
            <FormattedMessage id="cms.label.add" />
          </Button>
        </span>
      </InputGroup>
    </div>
  );

  const renderAttributes = ({ fields }) => compositeAttributes.map((attribute, index) => {
    const isMovableUp = index > 0;
    const isMovableDown = index < compositeAttributes.length - 1;
    return (
      <tr key={attribute.code}>
        <td className="ContTypeAttributeListRow__td">{attribute.code}</td>
        <td className="ContTypeAttributeListRow__td">{attribute.type}</td>
        <td className="ContTypeAttributeListRow__td text-center">
          <AttributeCheckIcon isChecked={attribute.mandatory || false} />
        </td>
        <td className="ContTypeAttributeListRow__td text-center">
          <div data-testid={`${attribute.code}-actions`}>
            <DropdownKebab pullRight id={`${attribute.code}-actions`}>
              {isMovableUp ? (
                <MenuItem
                  className="ContTypeAttributeListMenuAction__menu-item-move-up"
                  onClick={() => {
                    fields.move(index - 1, index);
                    onMove(index, index - 1, isMonolistCompositeType);
                  }}
                >
                  <FormattedMessage id="cms.label.moveUp" />
                </MenuItem>
              ) : null}
              {isMovableDown ? (
                <MenuItem
                  className="ContTypeAttributeListMenuAction__menu-item-move-down"
                  onClick={() => {
                    fields.move(index, index + 1);
                    onMove(index, index + 1, isMonolistCompositeType);
                  }}
                >
                  <FormattedMessage id="cms.label.moveDown" />
                </MenuItem>
              ) : null}
              <MenuItem
                className="ContTypeAttributeListMenuAction__menu-item-delete"
                onClick={() => {
                  fields.remove(index);
                  onClickDelete(attribute.code, isMonolistCompositeType);
                }}
              >
                <FormattedMessage id="cms.label.delete" />
              </MenuItem>
            </DropdownKebab>
          </div>
        </td>
      </tr>
    );
  });

  const renderTable = () => (
    <Col xs={10} xsOffset={2}>
      <table className="ContTypeAttributeListTableComposite__table table table-striped table-bordered">
        <thead>
          <tr>
            <th className="ContTypeAttributeListTableComposite__th-md">
              <FormattedMessage id="cms.contenttype.form.code" />
            </th>
            <th className="ContTypeAttributeListTableComposite__th-sm">
              <FormattedMessage id="cms.contenttype.form.type" />
            </th>
            <th className="ContTypeAttributeListTableComposite__th-xs text-center">
              <FormattedMessage id="cms.contenttype.form.mandatory" />
            </th>
            <th className="ContTypeAttributeListTableComposite__th-xs text-center">
              <FormattedMessage id="cms.contenttype.form.actions" />
            </th>
          </tr>
        </thead>
        <tbody>
          <FieldArray
            name={name}
            compositeAttributes={compositeAttributes}
            component={renderAttributes}
          />
        </tbody>
      </table>
    </Col>
  );

  return (
    <div className="AttributeListTableComposite">
      {renderSelectOption()}
      {compositeAttributes.length > 0 ? renderTable() : null}
    </div>
  );
};

AttributeListTableComposite.propTypes = {
  attributesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  compositeAttributes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onAddAttribute: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  isMonolistCompositeType: PropTypes.bool,
};

AttributeListTableComposite.defaultProps = {
  invalid: false,
  submitting: false,
  isMonolistCompositeType: false,
};

export default AttributeListTableComposite;
