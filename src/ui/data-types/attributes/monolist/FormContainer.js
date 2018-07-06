import { connect } from 'react-redux';
import { getParams } from '@entando/router';
import { formValueSelector } from 'redux-form';

import {
  fetchDataTypeAttribute,
  sendPutAttributeFromDataTypeMonolist,
  setActionMode,
  removeAttributeFromComposite,
  moveAttributeFromComposite,
} from 'state/data-types/actions';
import {
  getActionModeDataTypeSelectedAttribute,
  getDataTypeAttributesIdList,
} from 'state/data-types/selectors';
import { TYPE_COMPOSITE, MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE, MODE_ADD } from 'state/data-types/const';

import { ROUTE_ATTRIBUTE_MONOLIST_ADD, ROUTE_DATA_TYPE_ATTRIBUTE_ADD } from 'app-init/router';

import MonolistAttributeForm from 'ui/common/form/MonolistAttributeForm';

export const mapStateToProps = state => ({
  mode: getActionModeDataTypeSelectedAttribute(state),
  attributeCode: getParams(state).attributeCode,
  dataTypeCode: getParams(state).entityCode,
  isIndexable: formValueSelector('monoListAttribute')(state, 'nestedAttribute.indexable'),
  type: formValueSelector('monoListAttribute')(state, 'nestedAttribute.type'),
  selectedAttributeType: formValueSelector('monoListAttribute')(state, 'type'),
  attributesList: getDataTypeAttributesIdList(state),
});


export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ attributeCode, dataTypeCode, mode }) => {
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
      // dispatch(fetchAttributeFromDataType('monoListAttribute', dataTypeCode, attributeCode));
    }
  },
  onSubmit: (values) => {
    dispatch(sendPutAttributeFromDataTypeMonolist(values));
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

const AddFormContainer =
  connect(mapStateToProps, mapDispatchToProps)(MonolistAttributeForm);
export default AddFormContainer;
