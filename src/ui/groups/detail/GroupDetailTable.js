import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

class GroupDetailTable extends React.Component {
  componentWillMount() {
    this.props.onWillMount(this.props.groupname);
  }

  render() {
    const { group } = this.props;
    console.log(this.props);
    return (
      <div className="DetailGroupPage">
        <div className="form-horizontal">
          <div className="form-group">
            <label className="control-label col-xs-3 col-x3-3">
              <FormattedMessage id="app.group" />
            </label>
            <div className="col-xs-9 col-xs-9 form-control-static">
              <code>{group.code}</code>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-xs-3 col-xs-3">
              <FormattedMessage id="app.name" />
            </label>
            <div className="col-xs-9 col-xs-9 form-control-static">
              {group.name}
            </div>
          </div>

        </div>
      </div>);
  }
}

GroupDetailTable.propTypes = {
  onWillMount: PropTypes.func,
  groupname: PropTypes.string.isRequired,
  group: PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
  }),
};

GroupDetailTable.defaultProps = {
  onWillMount: () => {},
  group: {
    code: '',
    name: '',
  },
};

export default GroupDetailTable;
