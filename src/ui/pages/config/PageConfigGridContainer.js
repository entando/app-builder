import { connect } from 'react-redux';

import PageConfigGrid from 'ui/pages/config/PageConfigGrid';

import { getPageConfigCellMap } from 'state/page-config/selectors';

export const mapStateToProps = state => ({
  cellMap: getPageConfigCellMap(state),
});


const PageConfigGridContainer = connect(mapStateToProps, null)(PageConfigGrid);

export default PageConfigGridContainer;
