import { connect } from 'react-redux';
import { fetchDataTypeAttributes, sendPostDataType } from 'state/data-types/actions';
import { getDataTypeAttributesIdList } from 'state/data-types/selectors';
import DataTypeForm from 'ui/data-types/common/DataTypeForm';
import { ROUTE_DATA_TYPE_EDIT } from 'app-init/router';
import { gotoRoute } from 'frontend-common-components';
import { formValueSelector } from 'redux-form';

export const mapStateToProps = (state) => {
  console.log('lista attributi', getDataTypeAttributesIdList(state));
  return {
    mode: 'add',
    attributes: getDataTypeAttributesIdList(state),
    attributeCode: formValueSelector('DataType')(state, 'type'),
  };
};

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  onSubmit: (values) => {
    dispatch(sendPostDataType(values));
    gotoRoute(ROUTE_DATA_TYPE_EDIT, { datatypeCode: values.code });
  },

});
const DataTypeFormContainer = connect(mapStateToProps, mapDispatchToProps)(DataTypeForm);
export default DataTypeFormContainer;
