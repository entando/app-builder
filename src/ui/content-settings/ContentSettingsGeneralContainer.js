import { connect } from 'react-redux';
import moment from 'moment';
import {
  getIndexesStatus,
  getReferencesStatus,
  getIndexesLastReload,
  getEditorSettings,
} from 'state/content-settings/selectors';
import { getLoading } from 'state/loading/selectors';
import {
  fetchContentSettings,
  sendPostReloadReferences,
  sendPostReloadIndexes,
  sendPutEditorSettings,
} from 'state/content-settings/actions';
import ContentSettingsGeneral from 'ui/content-settings/ContentSettingsGeneral';

export const mapStateToProps = (state) => {
  const loads = getLoading(state);

  const indexesLastReload = getIndexesLastReload(state);
  let indexesLastReloadProps = {
    indexesLastReloadDate: null,
    indexesLastReloadResult: false,
  };
  if (indexesLastReload) {
    const mstamp = moment.unix(indexesLastReload.date / 1000);
    indexesLastReloadProps = {
      indexesLastReloadDate: mstamp.format('DD/MM/YYYY kk:mm'),
      indexesLastReloadResult: indexesLastReload.result === 1,
    };
  }

  return {
    ...indexesLastReloadProps,
    indexesStatus: getIndexesStatus(state),
    referenceStatus: getReferencesStatus(state),
    editorSettings: getEditorSettings(state),
    isReloadingReferences: loads.reloadReferences,
    isReloadingIndexes: loads.reloadIndexes,
    isEditorChanging: loads.putEditorSettings,
    loading: loads.getSettings,
  };
};

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => dispatch(fetchContentSettings()),
  onReloadReferences: () => dispatch(sendPostReloadReferences()),
  onReloadIndexes: () => dispatch(sendPostReloadIndexes()),
  onEditorChange: key => dispatch(sendPutEditorSettings({ key })),
});

const ContentSettingsGeneralContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentSettingsGeneral);

export default ContentSettingsGeneralContainer;
