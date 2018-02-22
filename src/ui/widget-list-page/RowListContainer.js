import { connect } from 'react-redux';
import RowList from 'ui/widget-list-page/widget-list/RowList';
// import { getTableRow } from 'state/widget-list/selectors';


export const mapStateToProps = (state) => {
  console.log('stato', state);
  return (
    {
      tableRow: state.widgetList,
      // getTableRow è definito nel selettore

    });
};

const RowListContainer = connect(mapStateToProps, null)(RowList);

export default RowListContainer;
