import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { clearErrors } from '@entando/messages';
import { getContentModelList } from 'state/content-model/selectors';
import HandpickedContentsConfigForm from 'ui/widgets/config/forms/HandpickedContentsConfigForm';
import { fetchContentModelListPaged } from 'state/content-model/actions';
import { fetchSearchPages } from 'state/pages/actions';
import { fetchLanguages } from 'state/languages/actions';
import { getLocale } from 'state/locale/selectors';
import { getSearchPages } from 'state/pages/selectors';
import { getActiveLanguages } from 'state/languages/selectors';
import { putPageWidget } from 'api/pages';

const parseConfig = (widgetConfig) => {
  if (!widgetConfig || !widgetConfig.contents) {
    return widgetConfig;
  }
  const jsonContents = widgetConfig.contents.replace(/((?:\w|_)+)(?:=)((?:\w|\d)+)/gm, '"$1":"$2"');
  const contents = JSON.parse(jsonContents);
  return {
    ...widgetConfig,
    contents,
  };
};

export const mapStateToProps = (state, ownProps) => ({
  contentModels: getContentModelList(state),
  initialValues: parseConfig(ownProps.widgetConfig),
  languages: getActiveLanguages(state),
  pages: getSearchPages(state),
  language: getLocale(state),
  widgetCode: ownProps.widgetCode,
  // TODO get content state slice
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onDidMount: () => {
    dispatch(fetchContentModelListPaged({ page: 1, pageSize: 0 }));
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchSearchPages({ page: 1, pageSize: 0 }));
    // TODO fetch contents to resolve content descriptions
  },
  onSubmit: (values) => {
    dispatch(clearErrors());
    console.log('config form submit: ', values, ownProps.widgetCode);
    const { pageCode, frameId, widgetCode } = ownProps;
    const configItem = Object.assign({ config: values }, { code: widgetCode });
    dispatch(clearErrors());
    dispatch(putPageWidget(pageCode, frameId, configItem));
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(HandpickedContentsConfigForm));
