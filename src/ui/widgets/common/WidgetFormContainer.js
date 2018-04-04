import { connect } from 'react-redux';
import { fetchGroups } from 'state/groups/actions';
import { getGroupsList } from 'state/groups/selectors';
import WidgetForm from 'ui/widgets/common/WidgetForm';

export const mapStateToProps = state => ({
  groups: getGroupsList(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => { dispatch(fetchGroups()); },
  onSubmit: (values) => {
    // call post
    // eslint-disable-next-line no-console
    console.log(values);
  },

});

const WidgetFormContainer = connect(mapStateToProps, mapDispatchToProps)(WidgetForm);
export default WidgetFormContainer;
