import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import GroupDetailTabs from 'ui/groups/detail/GroupDetailTabs';

class GroupDetailTable extends React.Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const { group } = this.props;
    return (
      <div className="DetailGroupPage">
        <div className="DetailGroupPage__header form-horizontal">
          <div className="form-group">
            <label className="control-label col-xs-3">
              <FormattedMessage id="app.group" />
            </label>
            <div className="col-xs-9 form-control-static">
              <code>{group.code}</code>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-xs-3">
              <FormattedMessage id="app.name" />
            </label>
            <div className="col-xs-9 form-control-static">
              {group.name}
            </div>
          </div>
        </div>
        <GroupDetailTabs references={group.references} keyList={group.referenceKeyList} />
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
    code: null,
    name: null,
  },
};

export default GroupDetailTable;
