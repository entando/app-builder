import { connect } from 'react-redux';
import { getComponentRepositoryFilters } from 'state/component-repository/components/selectors';
import { getComponentRepositoryList } from 'state/component-repository/component-repositories/selectors';
import { filterByComponentRepositories } from 'state/component-repository/actions';
import { fetchComponentRepositories } from 'state/component-repository/component-repositories/actions';
import ComponentRepositoryFilter from 'ui/component-repository/ComponentRepositoryFilter';

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => dispatch(fetchComponentRepositories()),
  onChange: (eventOrValue) => {
    const { componentRepositories } = eventOrValue;
    if (componentRepositories) {
      dispatch(filterByComponentRepositories(componentRepositories));
    }
  },
});

export const mapStateToProps = state => ({
  componentRepositories: getComponentRepositoryList(state),
  initialValues: { componentRepositories: getComponentRepositoryFilters(state) },
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(ComponentRepositoryFilter);
