import { connect } from 'react-redux';
import { fetchDataTypeAttributes } from 'state/data-types/actions';
// inset getAttributes
import { getDataTypeAttributesIdList } from 'state/data-types/selectors';
import DataTypeForm from 'ui/data-types/common/DataTypeForm';

export const mapStateToProps = state => ({
  // get selected attribute on select
  attributes: getDataTypeAttributesIdList(state),

});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypeAttributes());
  },
  handleSubmit: values => (values),

});
const DataTypeFormContainer = connect(mapStateToProps, mapDispatchToProps)(DataTypeForm);
export default DataTypeFormContainer;
