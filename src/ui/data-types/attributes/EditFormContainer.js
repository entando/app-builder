import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { getParams } from '@entando/router';
import { METHODS } from '@entando/apimanager';

import EditAttributeForm from 'ui/common/form/EditAttributeForm';
import {
  fetchAttributeFromDataType,
  handlerAttributeFromDataType,
  fetchDataTypeAttributes,
  fetchDataTypeAttribute,
  removeAttributeFromComposite,
  moveAttributeFromComposite,
} from 'state/data-types/actions';

import {
  getSelectedAttributeType,
  getDataTypeAttributesIdList,
  getDataTypeSelectedAttributeAllowedRoles,
  getSelectedCompositeAttributes,
  getActionModeDataTypeSelectedAttribute,
  getDataTypeSelectedAttribute,
} from 'state/data-types/selectors';

import { ROUTE_DATA_TYPE_ATTRIBUTE_ADD } from 'app-init/router';

export const mapStateToProps = state => ({
  mode: getActionModeDataTypeSelectedAttribute(state) || 'edit',
  attributeCode: getParams(state).attributeCode,
  dataTypeAttributeCode: getParams(state).entityCode,
  joinAllowedOptions:
    formValueSelector('attribute')(state, 'joinRoles') ||
    formValueSelector('attribute')(state, 'joinAllowedOptions') || [],
  selectedAttributeType: getSelectedAttributeType(state),
  selectedAttributeTypeForAddComposite: getDataTypeSelectedAttribute(state),
  attributesList: getDataTypeAttributesIdList(state),
  allowedRoles: getDataTypeSelectedAttributeAllowedRoles(state),
  compositeAttributes: getSelectedCompositeAttributes(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ dataTypeAttributeCode, attributeCode }) => {
    dispatch(fetchAttributeFromDataType('attribute', dataTypeAttributeCode, attributeCode));
    dispatch(fetchDataTypeAttributes());
  },
  onSubmit: (values, allowedRoles, mode) => {
    dispatch(handlerAttributeFromDataType(METHODS.PUT, values, allowedRoles, mode));
  },
  onAddAttribute: (props) => {
    const { attributeCode, dataTypeAttributeCode, selectedAttributeType } = props;
    dispatch(fetchDataTypeAttribute(
      attributeCode,
      {
        route: ROUTE_DATA_TYPE_ATTRIBUTE_ADD,
        params: { entityCode: dataTypeAttributeCode },
      },
      selectedAttributeType,
      'attribute',
    ));
  },
  onClickDelete: (attributeCode) => {
    dispatch(removeAttributeFromComposite(attributeCode));
  },
  onMove: (fromIndex, toIndex) => {
    dispatch(moveAttributeFromComposite(fromIndex, toIndex));
  },
});

const EditFormContainer =
connect(mapStateToProps, mapDispatchToProps)(EditAttributeForm);
export default EditFormContainer;
