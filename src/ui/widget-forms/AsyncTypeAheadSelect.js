// got from https://github.com/patternfly/patternfly-react/blob/master/packages/patternfly-3/patternfly-react/src/components/TypeAheadSelect/AsyncTypeAheadSelect.js
// TODO remove it after upgrading to v2.x of patternfly-react
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import PropTypes from 'prop-types';

class AsyncTypeAheadSelect extends React.Component {
  constructor(props) {
    super(props);
    const { options, isLoading } = this.props;
    this.state = {
      options,
      isLoading,
    };
    this.onSearchStart = this.onSearchStart.bind(this);
    this.onSearchEnd = this.onSearchEnd.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  onSearchStart() {
    this.setState({ isLoading: true });
  }

  onSearchEnd(options) {
    this.setState({ options, isLoading: false });
  }

  // query is the text string entered by the user.
  handleSearch(query) {
    const { onSearch } = this.props;
    this.onSearchStart();
    Promise.resolve(onSearch(query)).then(options => this.onSearchEnd(options));
  }

  render() {
    const { innerRef, ...props } = this.props;
    const { options, isLoading } = this.state;
    return (
      <AsyncTypeahead
        {...props}
        ref={innerRef}
        onSearch={this.handleSearch}
        options={options}
        isLoading={isLoading}
      />
    );
  }
}

AsyncTypeAheadSelect.propTypes = {
  /** Callback function for search */
  onSearch: PropTypes.func.isRequired,
  /** Array of selectable options */
  options: PropTypes.array,
  /** Flag to indicate if typeahead is loading */
  isLoading: PropTypes.bool,
  /** Internal property to access the react bootstrap typeahead component via outer ref property */
  innerRef: PropTypes.any,
};

AsyncTypeAheadSelect.defaultProps = {
  options: [],
  isLoading: false,
  innerRef: null,
};

// eslint-disable-next-line react/no-multi-comp
export default React.forwardRef((props, ref) => <AsyncTypeAheadSelect {...props} innerRef={ref} />);
