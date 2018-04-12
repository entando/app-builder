import { connect } from 'react-redux';
import RowList from 'ui/widgets/list/RowList';
import { getListWidget } from 'state/widgets/selectors';
import { getLocale } from 'state/locale/selectors';
import { sendDeleteWidgets } from 'state/widgets/actions';

export const mapStateToProps = state => ({
  tableRow: getListWidget(state),
  locale: getLocale(state),
});

export const mapDispatchToProps = dispatch => ({
  onDelete: (widgetCode) => {
    dispatch(sendDeleteWidgets(widgetCode));
  },
});
const RowListContainer = connect(mapStateToProps, mapDispatchToProps)(RowList);

export default RowListContainer;
