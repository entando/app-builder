import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
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
import { HOMEPAGE_CODE } from 'state/pages/const';

export const NavigationBarWidgetID = 'navigationBarWidgetForm';

export const mapStateToProps = (state, ownProps) => ({
  initialValues: ownProps.widgetConfig || {},
  pages: getSearchPages(state) || [],
  language: getLocale(state),
  widgetCode: ownProps.widgetCode,
  loading: getLoading(state).expressionList,
  appTourProgress: getAppTourProgress(state),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onDidMount: ({ appTourProgress, setFieldValue }) => {
    if (appTourProgress === APP_TOUR_STARTED) {
      setFieldValue('addConfig', { spec: 'code', targetCode: HOMEPAGE_CODE });
    }
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchSearchPages({ page: 1, pageSize: 0 }));
  },
  fetchExpressions: ({ setFieldValue }) => {
    const { widgetConfig } = ownProps || {};
    const { navSpec } = widgetConfig || {};
    if (navSpec) {
      dispatch(sendGetNavigatorExpressionsFromNavspec(navSpec)).then((res) => {
        if (res) {
          const { expressions = [] } = res;
          return setFieldValue('expressions', expressions);
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
  onSave: (submitForm) => {
    dispatch(setAppTourLastStep(17));
    dispatch(setVisibleModal(''));
    submitForm();
  },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => {
    dispatch(setVisibleModal(''));
    const { history, pageCode } = ownProps;
    history.push(routeConverter(ROUTE_PAGE_CONFIG, { pageCode }));
  },
  onAddNewExpression: (values, appTourProgress, setFieldValue) => {
    const newExpression = { ...values.addConfig };
    newExpression.specSuperLevel = values.addConfig.specSuperLevel || 1;
    newExpression.specAbsLevel = values.addConfig.specAbsLevel || 1;
    newExpression.operatorSubtreeLevel = values.addConfig.operatorSubtreeLevel || '1';
    setFieldValue('expressions', [...values.expressions, newExpression]);
    if (appTourProgress === APP_TOUR_STARTED) {
      dispatch(setAppTourLastStep(16));
    }
  },
  onRemoveExpression: (index, setFieldValue, values) => {
    const { expressions } = values;
    expressions.splice(index, 1);
    setFieldValue('expressions', expressions);
  },
  onSwapExpressions: (indexA, indexB, setFieldValue, values) => {
    const { expressions } = values;
    const temp = expressions[indexA];
    expressions[indexA] = expressions[indexB];
    expressions[indexB] = temp;
    setFieldValue('expressions', expressions);
  },
  onSpecificPageChoose: (chosenPage, appTourProgress, setFieldValue) => {
    if (appTourProgress === APP_TOUR_STARTED && chosenPage) {
      setFieldValue('addConfig.spec', 'code');
      dispatch(setAppTourLastStep(15));
    }
  },
});

const NavigationBarConfigFormContainer = injectIntl(NavigationBarConfigForm);

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(NavigationBarConfigFormContainer);
