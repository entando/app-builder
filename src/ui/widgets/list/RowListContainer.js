import { connect } from 'react-redux';
import RowList from 'ui/widgets/list/RowList';
import { getListWidget } from 'state/widgets/selectors';


export const mapStateToProps = state =>
  (
    {
      tableRow: getListWidget(state),
    });
const RowListContainer = connect(mapStateToProps, null)(RowList);

export default RowListContainer;
