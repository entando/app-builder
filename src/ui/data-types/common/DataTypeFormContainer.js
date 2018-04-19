import { connect } from 'react-redux';
import { fetchDataTypeAttributes, fetchDataTypeAttribute } from 'state/data-types/actions';
import { getDataTypeAttributesIdList } from 'state/data-types/selectors';
import DataTypeForm from 'ui/data-types/common/DataTypeForm';
import { ROUTE_ATTRIBUTE_ADD } from 'app-init/router';
import { gotoRoute } from 'frontend-common-components';
import { formValueSelector } from 'redux-form';

export const mapStateToProps = state => ({
  attributes: getDataTypeAttributesIdList(state),
  attributeCode: formValueSelector('DataType')(state, 'type'),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  onAddAttribute: (attributeCode) => {
    dispatch(fetchDataTypeAttribute(attributeCode));
    gotoRoute(ROUTE_ATTRIBUTE_ADD);
  },
  handleSubmit: values => (values),

});
const DataTypeFormContainer = connect(mapStateToProps, mapDispatchToProps)(DataTypeForm);
export default DataTypeFormContainer;
