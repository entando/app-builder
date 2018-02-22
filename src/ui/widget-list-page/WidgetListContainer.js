import { connect } from 'react-redux';
import rowList from 'ui/widget-list-page/widget-list/rowList';
import { getTableRow } from 'state/widget-list/selectors';


export const mapStateToProps = state => ({
  tableRow: getTableRow(state),
  // getTableRow è definito nel selettore
});

const rowListContainer = connect(mapStateToProps, null)(rowList);

export default rowListContainer;
