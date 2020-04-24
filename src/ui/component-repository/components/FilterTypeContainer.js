import { connect } from 'react-redux';
import { setECRFilterType } from 'state/component-repository/components/actions';
import { getECRSearchFilterType } from 'state/component-repository/components/selectors';
import FilterType from 'ui/common/form/FilterType';

export const mapStateToProps = state => ({
  currentFilterType: getECRSearchFilterType(state),
});

export const mapDispatchToProps = dispatch => ({
  onFilterTypeSelected: filterType => dispatch(setECRFilterType(filterType)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(FilterType);
