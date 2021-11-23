import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { withRouter } from 'react-router-dom';
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
  getIsMonolistComposteAttributeType,
} from 'state/data-types/selectors';

import { ROUTE_DATA_TYPE_ATTRIBUTE_ADD } from 'app-init/router';

export const mapStateToProps = (state, { match: { params } }) => ({
  mode: getActionModeDataTypeSelectedAttribute(state) || 'edit',
  attributeCode: params.attributeCode,
  dataTypeAttributeCode: params.entityCode,
  joinAllowedOptions:
    formValueSelector('attribute')(state, 'joinRoles') ||
    formValueSelector('attribute')(state, 'joinAllowedOptions') || [],
  selectedAttributeType: getSelectedAttributeType(state),
  selectedAttributeTypeForAddComposite: getDataTypeSelectedAttribute(state),
  attributesList: getDataTypeAttributesIdList(state),
  allowedRoles: getDataTypeSelectedAttributeAllowedRoles(state),
  compositeAttributes: getSelectedCompositeAttributes(state),
  isMonolistCompositeType: getIsMonolistComposteAttributeType(state),
  nestedAttributeComposite: formValueSelector('attribute')(state, 'nestedAttribute.type') || '',
});

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onDidMount: ({ dataTypeAttributeCode, attributeCode }) => {
    dispatch(clearErrors());
    dispatch(fetchAttributeFromDataType('attribute', dataTypeAttributeCode, attributeCode));
    dispatch(fetchDataTypeAttributes());
  },
  onSubmit: (values, allowedRoles, mode) => {
    dispatch(handlerAttributeFromDataType(
      METHODS.PUT,
      values,
      allowedRoles,
      mode,
      params.entityCode,
    ));
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(EditAttributeForm));
