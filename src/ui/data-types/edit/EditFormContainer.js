import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { getParams } from '@entando/router';
import {
  fetchDataTypeAttributes,
  sendPutDataType,
  fetchDataType,
  fetchDataTypeAttribute,
  sendMoveAttributeUp,
  sendMoveAttributeDown,
} from 'state/data-types/actions';
import {
  getSelectedDataTypeAttributes,
  getDataTypeAttributesIdList,

} from 'state/data-types/selectors';
import DataTypeForm from 'ui/data-types/common/DataTypeForm';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/data-types/attributes/DeleteAttributeModal';
import { ROUTE_DATA_TYPE_ATTRIBUTE_ADD, ROUTE_DATA_TYPE_ATTRIBUTE_EDIT } from 'app-init/router';

export const mapStateToProps = state => ({
  mode: 'edit',
  dataTypeCode: getParams(state).datatypeCode,
  attributes: getSelectedDataTypeAttributes(state),
  attributesType: getDataTypeAttributesIdList(state),
  attributeCode: formValueSelector('DataType')(state, 'type'),
  routeToEdit: ROUTE_DATA_TYPE_ATTRIBUTE_EDIT,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ dataTypeCode }) => {
    dispatch(fetchDataType(dataTypeCode));
    dispatch(fetchDataTypeAttributes());
  },
  onAddAttribute: ({ attributeCode, dataTypeCode }) => {
    dispatch(fetchDataTypeAttribute(
      attributeCode,
      {
        route: ROUTE_DATA_TYPE_ATTRIBUTE_ADD,
        params: { entityCode: dataTypeCode },
      },
    ));
  },
  onMoveUp: (entityCode, attributeCode, attributeIndex) => {
    dispatch(sendMoveAttributeUp({ entityCode, attributeCode, attributeIndex }));
  },
  onMoveDown: (entityCode, attributeCode, attributeIndex) => {
    dispatch(sendMoveAttributeDown({ entityCode, attributeCode, attributeIndex }));
  },
  onClickDelete: (code) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'attribute', code }));
  },
  onSubmit: (values) => {
    dispatch(sendPutDataType(values));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(DataTypeForm);
