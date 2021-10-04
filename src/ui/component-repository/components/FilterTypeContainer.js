import { connect } from 'react-redux';
import { setECRFilterType } from 'state/component-repository/components/actions';
import { getECRSearchFilterType } from 'state/component-repository/components/selectors';
import FilterType from 'ui/component-repository/components/FilterType';

export const mapStateToProps = (state, ownProps) => ({
  currentFilterType: getECRSearchFilterType(state),
  ...(ownProps && ownProps.filterTypes && { filterTypes: ownProps.filterTypes }),
});

export const mapDispatchToProps = dispatch => ({
  onFilterTypeSelected: filterType => dispatch(setECRFilterType(filterType)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(FilterType);
