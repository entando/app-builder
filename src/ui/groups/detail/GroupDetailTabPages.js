import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Table } from 'react-bootstrap';

class GroupDetailTabPages extends React.Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const tr = this.props.referencePages.map(() => (
      <tr>
        <td>.</td>
        <td>.</td>
      </tr>
    ));

    return (
      <div className="GroupDetailTabPages">
        <Table striped bordered condensed hover >
          <thead>
            <tr>
              <th> <FormattedMessage id="app.pages" /></th>
              <th width={30}> <FormattedMessage id="app.actions" /></th>
            </tr>
          </thead>
          <tbody>
            {tr}
          </tbody>
        </Table>
      </div>
    );
  }
}

GroupDetailTabPages.propTypes = {
  onWillMount: PropTypes.func,
  referencePages: PropTypes.arrayOf(PropTypes.shape({

  })),
};

GroupDetailTabPages.defaultProps = {
  onWillMount: () => {},
  referencePages: [],
};

export default GroupDetailTabPages;
