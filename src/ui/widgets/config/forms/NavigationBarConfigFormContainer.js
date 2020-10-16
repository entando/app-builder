import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { reduxForm, submit, formValueSelector, arrayPush, change } from 'redux-form';
import { clearErrors, addToast, TOAST_SUCCESS, TOAST_ERROR } from '@entando/messages';
import { routeConverter } from '@entando/utils';
import NavigationBarConfigForm from 'ui/widgets/config/forms/NavigationBarConfigForm';
import { fetchSearchPages } from 'state/pages/actions';
import { fetchLanguages } from 'state/languages/actions';
import { getLocale } from 'state/locale/selectors';
import { getSearchPages } from 'state/pages/selectors';
import { updateConfiguredPageWidget } from 'state/widget-config/actions';

import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { ROUTE_PAGE_CONFIG } from 'app-init/router';
import { sendGetNavigatorNavspecFromExpressions, sendGetNavigatorExpressionsFromNavspec } from 'state/widgets/actions';
import { getLoading } from 'state/loading/selectors';
import { getAppTourProgress } from 'state/app-tour/selectors';
import { APP_TOUR_STARTED } from 'state/app-tour/const';
import { setAppTourLastStep } from 'state/app-tour/actions';

export const NavigationBarWidgetID = 'navigationBarWidgetForm';

export const mapStateToProps = (state, ownProps) => ({
  initialValues: ownProps.widgetConfig || {},
  pages: getSearchPages(state) || [],
  language: getLocale(state),
  widgetCode: ownProps.widgetCode,
  addConfig: formValueSelector(NavigationBarWidgetID)(state, 'addConfig'),
  expressions: formValueSelector(NavigationBarWidgetID)(state, 'expressions'),
  loading: getLoading(state).expressionList,
  appTourProgress: getAppTourProgress(state),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onDidMount: () => {
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchSearchPages({ page: 1, pageSize: 0 }));
  },
  fetchExpressions: (props) => {
    const { widgetConfig } = ownProps || {};
    const { navSpec } = widgetConfig || {};
    const { initialize } = props;
    if (navSpec) {
      dispatch(sendGetNavigatorExpressionsFromNavspec(navSpec)).then((res) => {
        if (res) {
          const { expressions = [] } = res;
          return dispatch(initialize({ expressions }));
        }
        return dispatch(addToast(
          'Error',
          TOAST_ERROR,
        ));
      });
    }
  },
  onSubmit: ({ expressions }) => {
    dispatch(clearErrors());
    const { intl } = ownProps;
    return dispatch(sendGetNavigatorNavspecFromExpressions(expressions)).then((res) => {
      if (res) {
        const {
          pageCode, frameId, widgetCode,
        } = ownProps;
        const payload = { navSpec: res.navSpec };
        dispatch(clearErrors());
        return dispatch(updateConfiguredPageWidget(
          payload,
          { pageCode, framePos: frameId, widgetCode },
        ))
          .then((data) => {
            if (data) {
              dispatch(setAppTourLastStep(17));
              dispatch(addToast(
                intl.formatMessage({ id: 'widget.update.success' }),
                TOAST_SUCCESS,
              ));
            }
          });
      }
      return dispatch(addToast(
        'Error',
        TOAST_ERROR,
      ));
    });
  },
  onSave: () => {
    dispatch(setAppTourLastStep(17));
    dispatch(setVisibleModal(''));
    dispatch(submit(NavigationBarWidgetID));
  },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => {
    dispatch(setVisibleModal(''));
    const { history, pageCode } = ownProps;
    history.push(routeConverter(ROUTE_PAGE_CONFIG, { pageCode }));
  },
  onAddNewExpression: (config, appTourProgress) => {
    const newExpression = { ...config };
    newExpression.specSuperLevel = config.specSuperLevel || 1;
    newExpression.specAbsLevel = config.specAbsLevel || 1;
    newExpression.operatorSubtreeLevel = config.operatorSubtreeLevel || '1';
    dispatch(arrayPush(NavigationBarWidgetID, 'expressions', newExpression));
    if (appTourProgress === APP_TOUR_STARTED) {
      dispatch(setAppTourLastStep(16));
    }
  },
  onSpecificPageChoose: (chosenPage, appTourProgress) => {
    if (appTourProgress === APP_TOUR_STARTED && chosenPage) {
      dispatch(change('navigationBarWidgetForm', 'addConfig.spec', 'code'));
      dispatch(setAppTourLastStep(15));
    }
  },
});

const NavigationBarConfigFormContainer = injectIntl(reduxForm({
  form: NavigationBarWidgetID,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(NavigationBarConfigForm));

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(NavigationBarConfigFormContainer);
