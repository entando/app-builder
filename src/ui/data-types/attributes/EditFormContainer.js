import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { getParams } from '@entando/router';
import { METHODS } from '@entando/apimanager';
import { clearErrors } from '@entando/messages';

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
  isMonolistComposteAttributeType,
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
  isMonolistCompositeType: isMonolistComposteAttributeType(state),
  nestedAttributeComposite: formValueSelector('attribute')(state, 'nestedAttribute.type') || '',
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ dataTypeAttributeCode, attributeCode }) => {
    dispatch(clearErrors());
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
  onClickDelete: (attributeCode, isMonolistCompositeType) => {
    dispatch(removeAttributeFromComposite(attributeCode, isMonolistCompositeType));
  },
  onMove: (fromIndex, toIndex, isMonolistCompositeType) => {
    dispatch(moveAttributeFromComposite(fromIndex, toIndex, isMonolistCompositeType));
  },
});

const EditFormContainer =
connect(mapStateToProps, mapDispatchToProps)(EditAttributeForm);
export default EditFormContainer;
