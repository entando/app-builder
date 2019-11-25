import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { clearErrors } from '@entando/messages';
import { getContentModelList } from 'state/content-model/selectors';
import HandpickedContentsConfigForm from 'ui/widgets/config/forms/HandpickedContentsConfigForm';
import { fetchContentModelListPaged } from 'state/content-model/actions';

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
  // TODO get content state slice
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch(fetchContentModelListPaged());
    // TODO fetch contents to resolve content descriptions
  },
  onSubmit: (values) => {
    dispatch(clearErrors());
    console.log('config form submit: ', values);
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(HandpickedContentsConfigForm));
