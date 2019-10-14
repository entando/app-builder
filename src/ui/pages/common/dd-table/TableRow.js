import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import DDTable from 'ui/pages/common/dd-table/DDTable';

const ELEMENT_CLASS_NAME = 'DDTable__tr';

class TableRow extends Component {
  constructor(props, context) {
    super(props);
    this.notifyHoverState = this.notifyHoverState.bind(this);
    this.notifyDrop = this.notifyDrop.bind(this);

    this.state = { hover: '' };

    if (!context || context.onDrop === undefined) {
      // eslint-disable-next-line no-console
      console.error(`Warning: ${TableRow.displayName} should only be used inside DDTable!`);
    }
  }

  getChildContext() {
    return {
      rowData: this.props.rowData,
    };
  }

  notifyHoverState(hover) {
    if (this.state.hover !== hover) {
      this.setState({ hover });
    }
  }

  notifyDrop(hoverType, dropItem) {
    this.context.onDrop(hoverType, dropItem, this.props.rowData);
  }

  render() {
    const {
      connectDropTarget, isOver, children, className,
    } = this.props;
    const classNameAr = [ELEMENT_CLASS_NAME, className];
    if (isOver) {
      classNameAr.push(`${ELEMENT_CLASS_NAME}--dnd-hover`);
    }

    if (isOver) {
      const { hover } = this.state;
      if (hover) {
        // adds classes depending on hover type:
        // DDTable__tr--dnd-hover-high
        // DDTable__tr--dnd-hover-medium
        // DDTable__tr--dnd-hover-low
        classNameAr.push(`${ELEMENT_CLASS_NAME}--dnd-hover-${hover}`);
      }
    }

    // pass unrelated props to the <tr>
    const trProps = Object.assign({}, this.props);
    ['connectDropTarget', 'isOver', 'children', 'className', 'rowData']
      .forEach((key) => {
        delete trProps[key];
      });

    return connectDropTarget((
      <tr
        {...trProps}
        className={classNameAr.join(' ').trim()}
        ref={(tr) => { this.tr = tr; }}
      >
        { children }
      </tr>
    ));
  }
}

TableRow.displayName = 'DDTable.Tr';

TableRow.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool,

  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  rowData: PropTypes.shape({}).isRequired,
};

TableRow.defaultProps = {
  className: '',
  isOver: false,
};


TableRow.contextTypes = {
  onDrop: PropTypes.func,
};

TableRow.childContextTypes = {
  rowData: PropTypes.shape({}),
};


export const getHoverType = (props, monitor, component) => {
  const co = monitor.getClientOffset();
  const targetTop = component.tr.getBoundingClientRect().top;
  const diff = co.y - targetTop;
  const oneThird = component.tr.clientHeight / 3;
  if (diff < oneThird) {
    return DDTable.DROP_HIGH;
  } else if (diff > component.tr.clientHeight - oneThird) {
    return DDTable.DROP_LOW;
  }
  return DDTable.DROP_MEDIUM;
};

export const dropSpec = {
  drop: (props, monitor, component) => {
    component.notifyDrop(getHoverType(props, monitor, component), monitor.getItem());
  },
  hover: (props, monitor, component) => {
    const hoverType = getHoverType(props, monitor, component);
    component.notifyHoverState(hoverType);
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});

export default DropTarget('DDTable', dropSpec, collect)(TableRow);
