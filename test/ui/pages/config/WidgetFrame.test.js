import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import WidgetFrame from 'ui/pages/config/WidgetFrame';

const FRAME = {
  pos: 1,
  descr: 'The frame descr',
};

const WIDGET = {
  code: 'widget_code',
  name: 'The widget name',
};

const connectDropTargetMock = jest.fn().mockImplementation(arg => arg);
const connectDragSourceMock = jest.fn().mockImplementation(arg => arg);
const onClickDeleteMock = jest.fn();

describe('WidgetFrame (basic rendering)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <WidgetFrame frame={FRAME} widget={WIDGET} />
    ));
  });

  it('has the WidgetFrame class', () => {
    expect(component.hasClass('WidgetFrame')).toBe(true);
  });

  it('does not have the WidgetFrame--drag-hover class', () => {
    expect(component.hasClass('WidgetFrame--drag-hover')).toBe(false);
  });

  it('renders the frame descr', () => {
    expect(component.contains(FRAME.descr)).toBe(true);
  });
});

describe('WidgetFrame (droppable)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <WidgetFrame frame={FRAME} widget={WIDGET} connectDropTarget={connectDropTargetMock} />
    ));
  });

  it('has the WidgetFrame class', () => {
    expect(component.hasClass('WidgetFrame')).toBe(true);
  });

  it('does not have the WidgetFrame--drag-hover class', () => {
    expect(component.hasClass('WidgetFrame--drag-hover')).toBe(false);
  });

  it('calls the connectDropTarget function', () => {
    expect(connectDropTargetMock).toHaveBeenCalled();
  });
});

describe('WidgetFrame (draggable)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <WidgetFrame frame={FRAME} widget={WIDGET} connectDragSource={connectDragSourceMock} />
    ));
  });

  it('has the WidgetFrame class', () => {
    expect(component.hasClass('WidgetFrame')).toBe(true);
  });

  it('does not have the WidgetFrame--drag-hover class', () => {
    expect(component.hasClass('WidgetFrame--drag-hover')).toBe(false);
  });

  it('calls the connectDropTarget function', () => {
    expect(connectDragSourceMock).toHaveBeenCalled();
  });
});

describe('WidgetFrame (hovered)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <WidgetFrame frame={FRAME} widget={WIDGET} isOver />
    ));
  });

  it('has the WidgetFrame class', () => {
    expect(component.hasClass('WidgetFrame')).toBe(true);
  });

  it('has the WidgetFrame--drag-hover class', () => {
    expect(component.hasClass('WidgetFrame--drag-hover')).toBe(true);
  });

  it('calls the connectDropTarget function', () => {
    expect(connectDropTargetMock).toHaveBeenCalled();
  });
});

describe('WidgetFrame (with onClickDelete handler)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <WidgetFrame frame={FRAME} widget={WIDGET} onClickDelete={onClickDeleteMock} />
    ));
  });

  it('calls the onClickDelete function', () => {
    component.find('.WidgetFrame__delete-btn').prop('onClick')();
    expect(onClickDeleteMock).toHaveBeenCalledWith(FRAME.pos);
  });
});
