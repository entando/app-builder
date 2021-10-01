import { connect } from 'react-redux';

import { change, formValueSelector } from 'redux-form';
import { getGroupsList } from 'state/groups/selectors';

import AssetsAdvancedSearch from 'ui/assets/AssetsAdvancedSearch';
import { advancedSearchFilter } from 'state/assets/actions';

export const mapStateToProps = state => ({
  groups: getGroupsList(state),
  groupFilter: formValueSelector('assetsAdvancedSearch')(state, 'group'),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: values => dispatch(advancedSearchFilter(
    values,
    undefined,
    ownProps.ownerGroup,
    ownProps.joinGroups,
  )),
  onSetGroup: group => dispatch(change('assetsAdvancedSearch', 'group', group)),
});

const AssetsAdvancedSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(AssetsAdvancedSearch);

export default AssetsAdvancedSearchContainer;
