import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PageConfigGrid from 'ui/pages/config/PageConfigGrid';

import { makeGetPageConfigCellMap } from 'state/page-config/selectors';

export const mapStateToProps = (state, { match: { params } }) => ({
  cellMap: makeGetPageConfigCellMap(params)(state),
});


export default withRouter(connect(mapStateToProps, null)(PageConfigGrid));
