import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearErrors } from '@entando/messages';
import { formValueSelector } from 'redux-form';

import {
  fetchAttributeFromDataType,
  fetchDataTypeAttribute,
  sendPutAttributeFromDataTypeMonolist,
  setActionMode,
  removeAttributeFromComposite,
  moveAttributeFromComposite,
} from 'state/data-types/actions';
import {
  getActionModeDataTypeSelectedAttribute,
  getDataTypeAttributesIdList,
  getDataTypeSelectedAttribute,
  getSelectedCompositeAttributes,
} from 'state/data-types/selectors';
import {
  TYPE_COMPOSITE,
  MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE,
  MODE_ADD_SUB_ATTRIBUTE_MONOLIST_COMPOSITE,
} from 'state/data-types/const';

import { ROUTE_ATTRIBUTE_MONOLIST_ADD, ROUTE_DATA_TYPE_ATTRIBUTE_ADD } from 'app-init/router';

import MonolistAttributeForm from 'ui/common/form/MonolistAttributeForm';

export const mapStateToProps = (state, { match: { params } }) => ({
  mode: getActionModeDataTypeSelectedAttribute(state),
  attributeCode: params.attributeCode,
  dataTypeCode: params.entityCode,
  isIndexable: formValueSelector('monoListAttribute')(state, 'nestedAttribute.indexable'),
  type: formValueSelector('monoListAttribute')(state, 'nestedAttribute.type'),
  selectedAttributeTypeForAddComposite: getDataTypeSelectedAttribute(state),
  selectedAttributeType: formValueSelector('monoListAttribute')(state, 'type'),
  attributesList: getDataTypeAttributesIdList(state),
  compositeAttributes: getSelectedCompositeAttributes(state),
});


export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onWillMount: ({ attributeCode, dataTypeCode, mode }) => {
    dispatch(clearErrors());
    if (mode === MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE) {
      dispatch(fetchDataTypeAttribute(
        TYPE_COMPOSITE,
        {
          route: ROUTE_ATTRIBUTE_MONOLIST_ADD,
          params: { entityCode: dataTypeCode, attributeCode },
        },
        '',
        'monoListAttribute',
      ));
    } else {
      dispatch(fetchAttributeFromDataType('monoListAttribute', dataTypeCode, attributeCode));
    }
  },
  onSubmit: (values) => {
    dispatch(sendPutAttributeFromDataTypeMonolist(values, params.entityCode));
  },
  onAddAttribute: ({ dataTypeCode, type }) => {
    dispatch(setActionMode(MODE_ADD_SUB_ATTRIBUTE_MONOLIST_COMPOSITE));
    dispatch(fetchDataTypeAttribute(
      type,
      {
        route: ROUTE_DATA_TYPE_ATTRIBUTE_ADD,
        params: { entityCode: dataTypeCode },
      },
      type,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(MonolistAttributeForm));
