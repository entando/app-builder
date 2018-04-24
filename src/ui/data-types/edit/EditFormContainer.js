import { connect } from 'react-redux';
import {
  fetchDataTypeAttributes, sendPutDataType, fetchDataType,
  fetchDataTypeAttribute,
} from 'state/data-types/actions';
import { getSelectedDataTypeAttributes, getDataTypeAttributesIdList } from 'state/data-types/selectors';
import DataTypeForm from 'ui/data-types/common/DataTypeForm';
import { formValueSelector } from 'redux-form';
import { getParams, gotoRoute } from '@entando/router';
import { ROUTE_DATA_TYPE_ATTRIBUTE_ADD, ROUTE_DATA_TYPE_ATTRIBUTE_EDIT } from 'app-init/router';

export const mapStateToProps = state =>
  // console.log('datatypeCode', getParams(state).datatypeCode);
  ({
    mode: 'edit',
    datatypeCode: getParams(state).datatypeCode,
    attributes: getSelectedDataTypeAttributes(state),
    attributesType: getDataTypeAttributesIdList(state),
    attributeCode: formValueSelector('DataType')(state, 'type'),
    routeToEdit: ROUTE_DATA_TYPE_ATTRIBUTE_EDIT,
  });
export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ datatypeCode }) => {
    dispatch(fetchDataType(datatypeCode));
    dispatch(fetchDataTypeAttributes());
  },
  onAddAttribute: ({ attributeCode, datatypeCode }) => {
    dispatch(fetchDataTypeAttribute(attributeCode)).then(() => {
      gotoRoute(ROUTE_DATA_TYPE_ATTRIBUTE_ADD, { entityCode: datatypeCode });
    });
  },
  onSubmit: (values) => {
    dispatch(sendPutDataType(values));
  },

});
const DataTypeFormContainer = connect(mapStateToProps, mapDispatchToProps)(DataTypeForm);
export default DataTypeFormContainer;
