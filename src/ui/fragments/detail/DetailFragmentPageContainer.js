import { connect } from 'react-redux';
import DetailFragmentPage from 'ui/fragments/detail/DetailFragmentPage';
import { fetchFragment } from 'state/fragment-form/actions';
import { getFragments, getPageModels, getWidgetType, getPluginCode } from 'state/fragment-form/selectors';
import { getParams } from 'frontend-common-components';


export const mapStateToProps = state => ({
  code: getParams(state).fragmentCode,
  widgetType: getWidgetType(state),
  pluginCode: getPluginCode(state),
  fragments: getFragments(state),
  pageModels: getPageModels(state),

});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (props) => {
    console.log('mapDispatchToProps- props ', props.code);
    dispatch(fetchFragment(props.code));
  },
  handleEdit: () => {
  },
  referencesFragments: (item) => {
    console.log('referencesFragments ', item);
  },
  referencesPageModels: (item) => {
    console.log('referencesPageModels ', item);
  },

});

const DetailFragmentPageContainer =
  connect(mapStateToProps, mapDispatchToProps)(DetailFragmentPage);

export default DetailFragmentPageContainer;
