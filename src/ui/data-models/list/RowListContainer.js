import { connect } from 'react-redux';
import RowList from 'ui/data-models/list/RowList';
import { getTableRow } from 'state/data-model-list/selectors';


export const mapStateToProps = state => (
  {
    tableRow: getTableRow(state),
  }
);
const RowListContainer = connect(mapStateToProps, null)(RowList);

export default RowListContainer;
