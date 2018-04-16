import { connect } from 'react-redux';
import WidgetForm from 'ui/widgets/common/WidgetForm';

import { fetchGroups } from 'state/groups/actions';
import { getGroupsList } from 'state/groups/selectors';
import { getSelectedWidgetDefaultUi } from 'state/widgets/selectors';
import { fetchWidget, sendPutWidgets } from 'state/widgets/actions';

const EDIT_MODE = 'edit';

export const mapStateToProps = state => (
  {
    mode: EDIT_MODE,
    groups: getGroupsList(state),
    defaultUIField: getSelectedWidgetDefaultUi(state),
  });

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchWidget());
    dispatch(fetchGroups());
  },
  onSubmit: (values) => {
    dispatch(sendPutWidgets(values));
  },
});

const EditWidgetFormContainer = connect(mapStateToProps, mapDispatchToProps)(WidgetForm);

export default EditWidgetFormContainer;
