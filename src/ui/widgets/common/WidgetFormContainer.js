import { connect } from 'react-redux';
import { change, initialize, submit } from 'redux-form';
import { clearErrors } from '@entando/messages';

import { withRouter } from 'react-router-dom';
import { routeConverter } from '@entando/utils';

import { setVisibleModal } from 'state/modal/actions';
import { ROUTE_WIDGET_LIST } from 'app-init/router';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { fetchLanguages } from 'state/languages/actions';
import { fetchGroups } from 'state/groups/actions';
import { getGroupsList } from 'state/groups/selectors';
import WidgetForm from 'ui/widgets/common/WidgetForm';
import { sendPostWidgets } from 'state/widgets/actions';

export const mapStateToProps = state => ({
  groups: getGroupsList(state),
});

export const mapDispatchToProps = (dispatch, { history }) => ({
  onWillMount: () => {
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchGroups({ page: 1, pageSize: 0 }));
    dispatch(initialize('widget'));
  },
  onSubmit: ({ values }) => {
    dispatch(setVisibleModal(''));
    const jsonData = {
      ...values,
      configUi: values.configUi ? JSON.parse(values.configUi) : null,
    };
    dispatch(clearErrors());
    return dispatch(sendPostWidgets(jsonData));
  },
  onChangeDefaultTitle: title =>
    dispatch(change('widget', 'code', title.replace(/\W/g, '_').toLowerCase())),
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('widget')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_WIDGET_LIST)); },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(WidgetForm));
