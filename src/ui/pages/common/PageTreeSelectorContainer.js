
import { connect } from 'react-redux';

import { PageTreeSelector } from '@entando/pagetreeselector';

import { handleExpandPage, fetchPageTreeAll, collapseAll } from 'state/pages/actions';

import { getPageTreePages } from 'state/pages/selectors';
import { getLoading } from 'state/loading/selectors';

export const mapStateToProps = (state, {
  pages, onPageSelect = null, input, field,
}) => {
  const onChange = (input || {}).onChange ? input.onChange : (val) => {
    (field || {}).onChange({
      target: {
        value: val,
        id: field.name,
        name: field.name,
      },
    });
  };
  return ({
    pages: pages || getPageTreePages(state),
    loading: getLoading(state).pageTree,
    onPageSelect,
    // support both redux-form and formik
    input: {
      ...(input || {}),
      ...(field || {}),
      value: (input || {}).value || (field || {}).value || '',
      onChange,
    },
  });
};

export const mapDispatchToProps = dispatch => ({
  onExpandPage: pageCode =>
    dispatch(handleExpandPage(pageCode)),
  onExpandAll: () => dispatch(fetchPageTreeAll()),
  onCollapseAll: () => dispatch(collapseAll()),
});


const PageTreeSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(PageTreeSelector);


export default PageTreeSelectorContainer;
