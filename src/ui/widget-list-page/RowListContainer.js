import { connect } from 'react-redux';
import RowList from 'ui/widget-list-page/widget-list/RowList';
import { getWidgetList } from 'state/widget-list/selectors';


export const mapStateToProps = state =>
  (
    {
      tableRow: getWidgetList(state),
      // tableRow: state.widgetList,
      // getTableRow è definito nel selettore
    });
const RowListContainer = connect(mapStateToProps, null)(RowList);

export default RowListContainer;
