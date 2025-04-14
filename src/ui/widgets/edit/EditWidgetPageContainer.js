
import { connect } from 'react-redux';

// import the Component to be connected
import EditWidgetPage from 'ui/widgets/edit/EditWidgetPage';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';
import { getSelectedWidget } from 'state/widgets/selectors';
import { getDefaultLanguage } from 'state/languages/selectors';

export const mapStateToProps = (state) => {
  const selectedWidget = getSelectedWidget(state) || {
    titles: {},
  };
  const defaultLang = getDefaultLanguage(state);
  return {
    widgetName: selectedWidget.titles ? selectedWidget.titles[defaultLang] : '',
  };
};


// connect the component
const EditWidgetPageContainer = connect(mapStateToProps, null)(EditWidgetPage);

// export connected component (Container)
export default withPermissions(SUPERUSER_PERMISSION)(EditWidgetPageContainer);
