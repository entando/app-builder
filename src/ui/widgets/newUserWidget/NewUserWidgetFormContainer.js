import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { routeConverter } from '@entando/utils';
import { submit } from 'redux-form';
import { clearErrors } from '@entando/messages';
import WidgetForm, { MODE_ADD_NEW } from 'ui/widgets/common/WidgetForm';

import { fetchLanguages } from 'state/languages/actions';
import { getActiveLanguages } from 'state/languages/selectors';
import { fetchMyGroups } from 'state/groups/actions';
import { getGroupsList } from 'state/groups/selectors';
import {
  getSelectedWidgetDefaultUi,
  getSelectedParentWidget,
  getSelectedParentWidgetParameters,
} from 'state/widgets/selectors';
import { initNewUserWidget, sendPostWidgets } from 'state/widgets/actions';
import { getLoading } from 'state/loading/selectors';

import { setVisibleModal } from 'state/modal/actions';
import { ROUTE_WIDGET_LIST } from 'app-init/router';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';

export const mapStateToProps = state => ({
  mode: MODE_ADD_NEW,
  groups: getGroupsList(state),
  parentWidget: getSelectedParentWidget(state),
  parentWidgetParameters: getSelectedParentWidgetParameters(state),
  defaultUIField: getSelectedWidgetDefaultUi(state),
  languages: getActiveLanguages(state),
  loading: getLoading(state).fetchWidget,
});

export const mapDispatchToProps = (dispatch, { history, match: { params } }) => ({
  onWillMount: () => {
    dispatch(fetchMyGroups());
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(initNewUserWidget(params.widgetCode));
  },
  onSubmit: (values, saveType) => {
    const jsonData = {
      ...values,
      configUi: values.configUi ? JSON.parse(values.configUi) : null,
    };
    dispatch(clearErrors());
    return dispatch(sendPostWidgets(jsonData, saveType));
  },
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('widget')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_WIDGET_LIST)); },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(WidgetForm));
