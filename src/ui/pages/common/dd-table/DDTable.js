import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TableDragLayer from 'ui/pages/common/dd-table/TableDragLayer';
import TableRow from 'ui/pages/common/dd-table/TableRow';
import DragHandle from 'ui/pages/common/dd-table/DragHandle';

class DDTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
    };
  }

  getChildContext() {
    return {
      onDragBegin: () => this.setState({ isDragging: true }),
      onDragEnd: () => this.setState({ isDragging: false }),
      onDrop: this.props.onDrop,
    };
  }


  render() {
    const {
      PreviewRenderer, children,
    } = this.props;
    const classNameAr = ['DDTable'];
    if (this.state.isDragging) {
      classNameAr.push('DDTable--dragging');
    }

    return (
      <div className={classNameAr.join(' ').trim()} style={{ position: 'relative' }}>
        { children }
        <TableDragLayer PreviewRenderer={PreviewRenderer} />
      </div>
    );
  }
}

DDTable.propTypes = {
  onDrop: PropTypes.func,
  PreviewRenderer: PropTypes.func,
  children: PropTypes.node.isRequired,
};

DDTable.defaultProps = {
  onDrop: () => {},
  PreviewRenderer: () => <div>PREVIEW</div>,
};

DDTable.childContextTypes = {
  onDragBegin: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDrop: PropTypes.func,
};

DDTable.Handle = DragHandle;
DDTable.Tr = TableRow;

DDTable.DROP_HIGH = 'high';
DDTable.DROP_MEDIUM = 'medium';
DDTable.DROP_LOW = 'low';

export default DDTable;
