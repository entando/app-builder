import { connect } from 'react-redux';
import { fetchDataTypes } from 'state/data-types/actions';
import { getDataTypeList } from 'state/data-types/selectors';
import DataModelSearchForm from 'ui/data-models/list/DataModelSearchForm';

export const mapStateToProps = state => ({
  dataTypes: getDataTypeList(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypes());
  },
  handleSubmit: values => (values),

});
const DataModelSearchFormContainer =
 connect(mapStateToProps, mapDispatchToProps)(DataModelSearchForm);
export default DataModelSearchFormContainer;
