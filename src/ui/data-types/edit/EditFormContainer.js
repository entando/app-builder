import { connect } from 'react-redux';
import {
  fetchDataTypeAttributes, sendPutDataType, fetchDataType,
  fetchDataTypeAttribute,
} from 'state/data-types/actions';
import { getSelectedDataTypeAttributes, getDataTypeAttributesIdList } from 'state/data-types/selectors';
import DataTypeForm from 'ui/data-types/common/DataTypeForm';
import { formValueSelector } from 'redux-form';
import { getParams, gotoRoute } from '@entando/router';
import { ROUTE_ATTRIBUTE_ADD } from 'app-init/router';

export const mapStateToProps = state => ({
  mode: 'edit',
  datatypeCode: getParams(state).datatypeCode,
  attributes: getSelectedDataTypeAttributes(state),
  attributesType: getDataTypeAttributesIdList(state),
  attributeCode: formValueSelector('DataType')(state, 'type'),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ datatypeCode }) => {
    dispatch(fetchDataType(datatypeCode));
    dispatch(fetchDataTypeAttributes());
  },
  onAddAttribute: ({ attributeCode, datatypeCode }) => {
    dispatch(fetchDataTypeAttribute(attributeCode));
    gotoRoute(ROUTE_ATTRIBUTE_ADD, { entityCode: datatypeCode });
  },
  onSubmit: (values) => {
    dispatch(sendPutDataType(values));
  },

});
const DataTypeFormContainer = connect(mapStateToProps, mapDispatchToProps)(DataTypeForm);
export default DataTypeFormContainer;
