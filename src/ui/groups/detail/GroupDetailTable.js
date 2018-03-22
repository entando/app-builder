import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

class GroupDetailTable extends React.Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    return (
      <div className="DetailGroupPage">
        <div className="form-horizontal">
          <div className="form-group">
            <label className="control-label col-xs-3 col-x3-3">
              <FormattedMessage id="app.group" />
            </label>
            <div className="col-xs-9 col-xs-9 form-control-static">
              <code>{this.props.group.code}</code>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-xs-3 col-xs-3">
              <FormattedMessage id="app.name" />
            </label>
            <div className="col-xs-9 col-xs-9 form-control-static">
              {this.props.group.name}
            </div>
          </div>

        </div>
      </div>);
  }
}

GroupDetailTable.propTypes = {
  onWillMount: PropTypes.func,
  group: PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
  }),
};

GroupDetailTable.defaultProps = {
  onWillMount: () => {},
  group: {
    code: 'code_group',
    name: 'name_group',
  },
};

export default GroupDetailTable;
