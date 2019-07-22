import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WidgetForm from 'ui/widgets/common/WidgetForm';

import { fetchLanguages } from 'state/languages/actions';
import { getActiveLanguages } from 'state/languages/selectors';
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
    languages: getActiveLanguages(state),
  });

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onWillMount: () => {
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchWidget(params.widgetCode));
    dispatch(fetchGroups({ page: 1, pageSize: 0 }));
  },
  onSubmit: (values) => {
    dispatch(sendPutWidgets(values));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WidgetForm));
