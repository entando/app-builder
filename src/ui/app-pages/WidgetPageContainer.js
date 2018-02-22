import { connect } from 'react-redux';
import WidgetPage from './WidgetPage';


export const mapDispatchToProps = () => ({
  onSubmit: (values) => {
    // call post
    console.log(values);
  },

});

const WidgetPageContainer = connect(null, mapDispatchToProps)(WidgetPage);
export default WidgetPageContainer;
