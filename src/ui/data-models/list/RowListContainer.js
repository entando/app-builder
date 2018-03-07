import { connect } from 'react-redux';
import RowList from 'ui/data-models/list/RowList';
import { getListDataModels } from 'state/data-model-list/selectors';


export const mapStateToProps = state => ({
  dataModels: getListDataModels(state),
});

const RowListContainer = connect(mapStateToProps, null)(RowList);

export default RowListContainer;
