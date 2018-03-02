import { connect } from 'react-redux';
import RowList from 'ui/widgets/list/RowList';
import { getTableRow } from 'state/widget-list/selectors';


export const mapStateToProps = state =>
  (
    {
      tableRow: getTableRow(state),
    });
const RowListContainer = connect(mapStateToProps, null)(RowList);

export default RowListContainer;
