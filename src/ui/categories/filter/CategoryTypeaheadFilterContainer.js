import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import CategoryTypeaheadFilter from 'ui/categories/filter/CategoryTypeaheadFilter';

import { fetchCategoryTreeAll } from 'state/categories/actions';
import { setContentCategoryFilter, setJoinContentCategory } from 'state/contents/actions';
import { getCategoryTree } from 'state/categories/selectors';

export const mapStateToProps = state => ({
  categories: getCategoryTree(state),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => dispatch(fetchCategoryTreeAll()),
  onChangeCategory: (categories, filterSubject) => {
    if (filterSubject === 'content') {
      dispatch(setContentCategoryFilter(categories));
    } else if (filterSubject === 'joinContentCategory') {
      dispatch(setJoinContentCategory(categories));
    }
  },
});

const CategoryTypeaheadFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryTypeaheadFilter);

export default injectIntl(CategoryTypeaheadFilterContainer);
