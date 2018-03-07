import { connect } from 'react-redux';
import { fetchWidgetTypes, fetchPlugins } from 'state/fragments/actions';
import FragmentSearchForm from 'ui/fragments/list/FragmentSearchForm';

export const mapStateToProps = state => ({
  widgetTypes: state,
  plugins: state,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchWidgetTypes());
    dispatch(fetchPlugins());
  },
  // calls search API when avaible
  onSubmit: () => {},
});

const WidgetFormContainer = connect(mapStateToProps, mapDispatchToProps)(FragmentSearchForm);
export default WidgetFormContainer;
