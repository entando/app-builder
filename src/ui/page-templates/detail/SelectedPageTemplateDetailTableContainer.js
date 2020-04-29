import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getSelectedPageTemplate, getSelectedPageTemplateCellMap } from 'state/page-templates/selectors';
import { getLoading } from 'state/loading/selectors';
import { loadSelectedPageTemplate } from 'state/page-templates/actions';
import PageTemplateDetailTable from 'ui/page-templates/detail/PageTemplateDetailTable';

export const mapStateToProps = state => ({
  pageTemplate: getSelectedPageTemplate(state),
  cellMap: getSelectedPageTemplateCellMap(state),
  loading: !!getLoading(state).pageTemplate,
});

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onWillMount: () => {
    dispatch(loadSelectedPageTemplate(params.pageTemplateCode));
  },
});

// eslint-disable-next-line function-paren-newline
const SelectedPageTemplateDetailTableContainer = withRouter(connect(
  mapStateToProps, mapDispatchToProps)(PageTemplateDetailTable));

SelectedPageTemplateDetailTableContainer.displayName = 'SelectedPageTemplateDetailTableContainer';

export default SelectedPageTemplateDetailTableContainer;
