import { connect } from 'react-redux';

import LabelsAndLanguagesPage from 'ui/labels/list/LabelsAndLanguagesPage';
import { fetchLanguages } from 'state/languages/actions';
import { fetchLabels } from 'state/labels/actions';


export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchLanguages());
    dispatch(fetchLabels());
  },
});


const LabelsAndLanguagesPageContainer = connect(null, mapDispatchToProps)(LabelsAndLanguagesPage);


export default LabelsAndLanguagesPageContainer;
