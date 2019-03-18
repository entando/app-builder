import { connect } from 'react-redux';

import SearchBar from 'ui/digital-exchange/components/SearchBar';


export const mapDispatchToProps = ({
  onSubmit: value => ({
    type: 'search',
    payload: value,
  }),
});

export const mapStateToProps = null;


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);
