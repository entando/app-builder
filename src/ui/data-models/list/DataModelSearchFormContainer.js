import { connect } from 'react-redux';
import { fetchDataTypes } from 'state/data-types/actions';
import { getDataTypeList } from 'state/data-types/selectors';
import { fetchDataModelListPaged } from 'state/data-models/actions';
import DataModelSearchForm from 'ui/data-models/list/DataModelSearchForm';
import { convertToQueryString } from '@entando/utils';

export const mapStateToProps = state => ({
  dataTypes: getDataTypeList(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataTypes());
  },

  onSubmit: (values) => {
    dispatch(fetchDataModelListPaged({ page: 1, pageSize: 10 }, convertToQueryString({
      formValues: values,
      sorting: {
        attribute: 'code',
      },
    })));
  },

});
const DataModelSearchFormContainer =
 connect(mapStateToProps, mapDispatchToProps)(DataModelSearchForm);
export default DataModelSearchFormContainer;
