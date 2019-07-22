import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { METHODS } from '@entando/apimanager';
import { clearErrors } from '@entando/messages';
import AttributeForm from 'ui/common/form/AttributeForm';
import {
  setActionMode,
  fetchDataTypeAttributes,
  handlerAttributeFromDataType,
  fetchDataTypeAttribute,
  removeAttributeFromComposite,
  moveAttributeFromComposite,
} from 'state/data-types/actions';

import {
  getDataTypeSelectedAttribute,
  getDataTypeSelectedAttributeCode,
  getDataTypeAttributesIdList,
  getDataTypeSelectedAttributeAllowedRoles,
  getActionModeDataTypeSelectedAttribute,
  getSelectedCompositeAttributes,
} from 'state/data-types/selectors';

import { ROUTE_DATA_TYPE_ATTRIBUTE_ADD } from 'app-init/router';
import { TYPE_COMPOSITE, MODE_ADD } from 'state/data-types/const';

export const mapStateToProps = (state, { match: { params } }) => ({
  mode: getActionModeDataTypeSelectedAttribute(state) || 'add',
  dataTypeAttributeCode: params.entityCode,
  joinAllowedOptions: formValueSelector('addAttribute')(state, 'joinRoles') || [],
  selectedAttributeType: getDataTypeSelectedAttribute(state),
  attributesList: getDataTypeAttributesIdList(state),
  initialValues: {
    type: getDataTypeSelectedAttributeCode(state),
    compositeAttributeType: TYPE_COMPOSITE,
  },
  allowedRoles: getDataTypeSelectedAttributeAllowedRoles(state),
  compositeAttributes: getSelectedCompositeAttributes(state),
});

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onWillMount: () => {
    dispatch(clearErrors());
    dispatch(fetchDataTypeAttributes());
  },
  onSubmit: (values, allowedRoles, mode) => {
    dispatch(handlerAttributeFromDataType(
      METHODS.POST,
      values,
      allowedRoles,
      mode,
      params.entityCode,
    ));
  },
  onAddAttribute: (props) => {
    const { attributeCode, entityCode, selectedAttributeType: { code } } = props;
    dispatch(setActionMode(MODE_ADD));
    dispatch(fetchDataTypeAttribute(
      attributeCode,
      {
        route: ROUTE_DATA_TYPE_ATTRIBUTE_ADD,
        params: { entityCode },
      },
      code,
      'addAttribute',
    ));
  },
  onClickDelete: (attributeCode) => {
    dispatch(removeAttributeFromComposite(attributeCode));
  },
  onMove: (fromIndex, toIndex) => {
    dispatch(moveAttributeFromComposite(fromIndex, toIndex));
  },

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AttributeForm));
