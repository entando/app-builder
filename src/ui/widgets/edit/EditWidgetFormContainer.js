import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { routeConverter } from '@entando/utils';
import { get } from 'lodash';
import { submit, getFormValues, isDirty, isInvalid, isSubmitting } from 'redux-form';
import WidgetForm from 'ui/widgets/common/WidgetForm';
import getAppBuilderWidgetForm from 'helpers/getAppBuilderWidgetForm';

import { fetchLanguages } from 'state/languages/actions';
import { getActiveLanguages } from 'state/languages/selectors';
import { fetchGroups } from 'state/groups/actions';
import { getGroupsList } from 'state/groups/selectors';
import {
  getSelectedWidgetDefaultUi,
  getSelectedParentWidget,
  getSelectedParentWidgetParameters,
  getSelectedWidgetParameters,
  getSelectedWidget,
} from 'state/widgets/selectors';
import { fetchWidget, sendPutWidgets } from 'state/widgets/actions';
import { getLoading } from 'state/loading/selectors';

import { setVisibleModal } from 'state/modal/actions';
import { ROUTE_WIDGET_LIST } from 'app-init/router';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { SIMPLE_WIDGET_CONFIG_FORM_ID } from 'ui/widgets/config/forms/SimpleWidgetConfigForm';
import { MFE_WIDGET_FORM_ID } from 'ui/widgets/config/WidgetConfigMicrofrontend';
import { hasMicrofrontendConfig, getMicrofrontend } from 'helpers/microfrontends';

const EDIT_MODE = 'edit';

export const getWidgetFormProperties = (widget, state) => {
  const appBuilderForm = widget && getAppBuilderWidgetForm(widget);

  const reduxFormId = appBuilderForm && appBuilderForm.reduxFormId;
  const widgetConfigDirty = reduxFormId && isDirty(appBuilderForm.reduxFormId)(state);
  const widgetConfigInvalid = reduxFormId && isInvalid(appBuilderForm.reduxFormId)(state);
  const widgetConfigSubmitting = reduxFormId && isSubmitting(appBuilderForm.reduxFormId)(state);
  const beforeSubmit = reduxFormId && appBuilderForm.beforeSubmit;

  const formId = hasMicrofrontendConfig(widget) ?
    MFE_WIDGET_FORM_ID : reduxFormId || SIMPLE_WIDGET_CONFIG_FORM_ID;
  return {
    formId,
    beforeSubmit,
    widgetConfigDirty,
    widgetConfigInvalid,
    widgetConfigSubmitting,
  };
};

export const mapStateToProps = (state) => {
  const selectedWidget = getSelectedWidget(state);
  const {
    formId, beforeSubmit, widgetConfigDirty, widgetConfigInvalid,
  } =
   getWidgetFormProperties(selectedWidget, state);

  return (
    {
      mode: EDIT_MODE,
      groups: getGroupsList(state),
      parameters: getSelectedWidgetParameters(state),
      parentWidget: getSelectedParentWidget(state),
      selectedWidget,
      parentWidgetParameters: getSelectedParentWidgetParameters(state),
      defaultUIField: getSelectedWidgetDefaultUi(state),
      languages: getActiveLanguages(state),
      loading: getLoading(state).fetchWidget,
      formId,
      formWidgetConfig: formId === MFE_WIDGET_FORM_ID ?
        get(selectedWidget, 'config', null) : getFormValues(formId)(state),
      beforeSubmit,
      widgetConfigDirty,
      widgetConfigInvalid,
    });
};

export const mapDispatchToProps = (dispatch, { history, match: { params } }) => ({
  onWillMount: () => {
    dispatch(fetchGroups({ page: 1, pageSize: 0 }));
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchWidget(params.widgetCode));
  },
  onSubmit: ({
    values, widgetConfig, formId, beforeSubmit, widget,
  }) => {
    const jsonData = {
      ...values,
      configUi: values.configUi ? JSON.parse(values.configUi) : null,
    };

    dispatch(setVisibleModal(''));

    if (hasMicrofrontendConfig(widget)) {
      const customElement = get(widget, 'configUi.customElement');
      const configWebComponent = getMicrofrontend(customElement);
      const updatedWidgetConfig = configWebComponent ? configWebComponent.config : null;
      dispatch(sendPutWidgets({ ...jsonData, config: updatedWidgetConfig }));
    } else if (formId && beforeSubmit) {
      beforeSubmit(dispatch, widgetConfig, params.widgetCode).then((res) => {
        dispatch(sendPutWidgets({ ...jsonData, config: res }));
      });
    } else {
      dispatch(sendPutWidgets(jsonData));
    }
  },
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('widget')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_WIDGET_LIST)); },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(WidgetForm));
