import { connect } from 'react-redux';
import { fetchDataTypes } from 'state/data-types/actions';
import { getListDataTypes } from 'state/data-types/selector';
import DataModelSearchForm from 'ui/data-models/list/DataModelSearchForm';

export const mapStateToProps = state => ({
  dataTypes: getListDataTypes(state),
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
