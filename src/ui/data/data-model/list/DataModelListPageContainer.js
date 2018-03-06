import { connect } from 'react-redux';
import { fetchDataModelListRow } from 'state/data-model-list/actions';
import DataModelListPage from 'ui/data/data-model/list/DataModelListPage';


export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDataModelListRow());
  },
});

const ListWidgetPageContainer = connect(null, mapDispatchToProps)(DataModelListPage);

export default ListWidgetPageContainer;
