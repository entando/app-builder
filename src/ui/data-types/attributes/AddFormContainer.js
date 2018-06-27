import { connect } from 'react-redux';
import { setActionMode, fetchDataTypeAttributes, handlerAttributeFromDataType, fetchDataTypeAttribute } from 'state/data-types/actions';
import { formValueSelector } from 'redux-form';
import { getParams } from '@entando/router';
import { METHODS } from '@entando/apimanager';
import AttributeForm from 'ui/common/form/AttributeForm';
// import AttributeFormComposite from 'ui/common/form/AttributeFormComposite';

import {
  getDataTypeSelectedAttribute,
  getDataTypeSelectedAttributeCode,
  getDataTypeAttributesIdList,
  getDataTypeSelectedAttributeAllowedRoles,
  getActionModeDataTypeSelectedAttribute,
} from 'state/data-types/selectors';

import { ROUTE_DATA_TYPE_ATTRIBUTE_ADD } from 'app-init/router';
import { TYPE_COMPOSITE, MODE_ADD } from 'state/data-types/const';

export const mapStateToProps = state => ({
  mode: getActionModeDataTypeSelectedAttribute(state) || 'add',
  dataTypeAttributeCode: getParams(state).entityCode,
  joinAllowedOptions: formValueSelector('addAttribute')(state, 'joinRoles') || [],
  selectedAttributeType: getDataTypeSelectedAttribute(state),
  attributesList: getDataTypeAttributesIdList(state),
  initialValues: {
    type: getDataTypeSelectedAttributeCode(state),
    compositeAttributeType: TYPE_COMPOSITE,
  },
  allowedRoles: getDataTypeSelectedAttributeAllowedRoles(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  onSubmit: (values, allowedRoles) => {
    dispatch(handlerAttributeFromDataType(METHODS.POST, values, allowedRoles));
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
});

const AddFormContainer =
connect(mapStateToProps, mapDispatchToProps)(AttributeForm);

export default AddFormContainer;
