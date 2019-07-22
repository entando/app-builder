import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PageConfigGrid from 'ui/pages/config/PageConfigGrid';

import { getPageConfigCellMap } from 'state/page-config/selectors';

export const mapStateToProps = (state, { match: { params } }) => ({
  cellMap: getPageConfigCellMap(params)(state),
});


export default withRouter(connect(mapStateToProps, null)(PageConfigGrid));
