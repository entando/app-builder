import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { reduxForm, submit } from 'redux-form';
import { clearErrors, addToast, TOAST_SUCCESS } from '@entando/messages';
import { routeConverter } from '@entando/utils';
import NavigationBarConfigForm from 'ui/widgets/config/forms/NavigationBarConfigForm';
import { fetchSearchPages } from 'state/pages/actions';
import { fetchLanguages } from 'state/languages/actions';
import { getLocale } from 'state/locale/selectors';
import { getSearchPagesRaw } from 'state/pages/selectors';
import { getActiveLanguages } from 'state/languages/selectors';
import { sendPutWidgetConfig } from 'state/page-config/actions';

import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { ROUTE_PAGE_CONFIG } from 'app-init/router';

const NavigationBarWidgetID = 'widgets.navigationBar';

export const mapStateToProps = (state, ownProps) => ({
  initialValues: ownProps.widgetConfig,
  languages: getActiveLanguages(state),
  pages: getSearchPagesRaw(state),
  language: getLocale(state),
  widgetCode: ownProps.widgetCode,
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onDidMount: () => {
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchSearchPages({ page: 1, pageSize: 0 }));
  },
  onSubmit: (values) => {
    dispatch(clearErrors());
    const {
      pageCode, frameId, intl, history,
    } = ownProps;
    const payload = { ...values };
    const configItem = Object.assign({ config: payload }, { code: ownProps.widgetCode });
    dispatch(clearErrors());
    return dispatch(sendPutWidgetConfig(pageCode, frameId, configItem)).then((res) => {
      if (res) {
        dispatch(addToast(
          intl.formatMessage({ id: 'widget.update.success' }),
          TOAST_SUCCESS,
        ));
        history.push(routeConverter(ROUTE_PAGE_CONFIG, { pageCode }));
      }
    });
  },
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit(NavigationBarWidgetID)); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => {
    dispatch(setVisibleModal(''));
    const { history, pageCode } = ownProps;
    history.push(routeConverter(ROUTE_PAGE_CONFIG, { pageCode }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(reduxForm({
  form: NavigationBarWidgetID,
})(NavigationBarConfigForm)));
