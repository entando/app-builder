import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import WidgetFrame from 'ui/pages/config/WidgetFrame';
import { WIDGET_STATUS_MATCH, WIDGET_STATUS_DIFF, WIDGET_STATUS_REMOVED } from 'state/page-config/const';

const FRAME_ID = 1;
const FRAME_NAME = 'The frame descr';
const WIDGET_ID = 'widget_code';
const WIDGET_NAME = 'The widget name';


const connectDropTargetMock = jest.fn().mockImplementation(arg => arg);
const connectDragSourceMock = jest.fn().mockImplementation(arg => arg);
const onClickDeleteMock = jest.fn();

describe('WidgetFrame (basic rendering)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <WidgetFrame
        frameId={FRAME_ID}
        widgetId={WIDGET_ID}
        frameName={FRAME_NAME}
        frameIsMainFrame={false}
        widgetName={WIDGET_NAME}
      />
    ));
  });

  it('has the WidgetFrame class', () => {
    expect(component.hasClass('WidgetFrame')).toBe(true);
  });

  it('does not have the WidgetFrame--drag-hover class', () => {
    expect(component.hasClass('WidgetFrame--drag-hover')).toBe(false);
  });

  it('renders the frame descr', () => {
    expect(component.contains(FRAME_NAME)).toBe(true);
  });
});

describe('WidgetFrame (droppable)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <WidgetFrame
        frameId={FRAME_ID}
        widgetId={WIDGET_ID}
        frameName={FRAME_NAME}
        frameIsMainFrame={false}
        widgetName={WIDGET_NAME}
        connectDropTarget={connectDropTargetMock}
      />
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
      <WidgetFrame
        frameId={FRAME_ID}
        widgetId={WIDGET_ID}
        frameName={FRAME_NAME}
        frameIsMainFrame={false}
        widgetName={WIDGET_NAME}
        connectDragSource={connectDragSourceMock}
      />
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
      <WidgetFrame
        frameId={FRAME_ID}
        widgetId={WIDGET_ID}
        frameName={FRAME_NAME}
        frameIsMainFrame={false}
        widgetName={WIDGET_NAME}
        isOver
      />
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
      <WidgetFrame
        frameId={FRAME_ID}
        widgetId={WIDGET_ID}
        frameName={FRAME_NAME}
        frameIsMainFrame={false}
        widgetName={WIDGET_NAME}
        onClickDelete={onClickDeleteMock}
      />
    ));
  });

  it('calls the onClickDelete function', () => {
    component.find('.WidgetFrame__delete-btn').prop('onClick')();
    expect(onClickDeleteMock).toHaveBeenCalledWith(FRAME_ID);
  });
});

describe('WidgetFrame (with widget that has config)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <WidgetFrame
        frameId={FRAME_ID}
        widgetId={WIDGET_ID}
        frameName={FRAME_NAME}
        frameIsMainFrame={false}
        widgetName={WIDGET_NAME}
        widgetHasConfig
      />
    ));
  });

  it('renders the API menu item', () => {
    expect(component.find('.WidgetFrame__api-btn').exists()).toBe(true);
  });

  it('renders the Settings menu item', () => {
    expect(component.find('.WidgetFrame__settings-btn').exists()).toBe(true);
  });

  it('renders the Save as new widget menu item', () => {
    expect(component.find('.WidgetFrame__save-btn').exists()).toBe(true);
  });
});

describe('WidgetFrame (with widget status = WIDGET_STATUS_DIFF)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <WidgetFrame
        frameId={FRAME_ID}
        widgetId={WIDGET_ID}
        frameName={FRAME_NAME}
        frameIsMainFrame={false}
        widgetName={WIDGET_NAME}
        widgetStatus={WIDGET_STATUS_DIFF}
      />
    ));
  });

  it('has the WidgetFrame--status-diff class', () => {
    expect(component.hasClass('WidgetFrame--status-diff')).toBe(true);
  });

  it('renders the actions menu', () => {
    expect(component.find('.WidgetFrame__menu-button').exists()).toBe(true);
  });
});

describe('WidgetFrame (with widget status = WIDGET_STATUS_MATCH)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <WidgetFrame
        frameId={FRAME_ID}
        widgetId={WIDGET_ID}
        frameName={FRAME_NAME}
        frameIsMainFrame={false}
        widgetName={WIDGET_NAME}
        widgetHasConfig
        widgetStatus={WIDGET_STATUS_MATCH}
      />
    ));
  });

  it('has the WidgetFrame--status-match class', () => {
    expect(component.hasClass('WidgetFrame--status-match')).toBe(true);
  });

  it('renders the actions menu', () => {
    expect(component.find('.WidgetFrame__menu-button').exists()).toBe(true);
  });
});

describe('WidgetFrame (with widget status = WIDGET_STATUS_REMOVED)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <WidgetFrame
        frameId={FRAME_ID}
        widgetId={WIDGET_ID}
        frameName={FRAME_NAME}
        frameIsMainFrame={false}
        widgetName={WIDGET_NAME}
        widgetHasConfig
        widgetStatus={WIDGET_STATUS_REMOVED}
      />
    ));
  });

  it('has the WidgetFrame--status-removed class', () => {
    expect(component.hasClass('WidgetFrame--status-removed')).toBe(true);
  });

  it('does not render the actions menu', () => {
    expect(component.find('.WidgetFrame__menu-button').exists()).toBe(false);
  });
});

describe('WidgetFrame (with main frame)', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <WidgetFrame
        frameId={FRAME_ID}
        widgetId={WIDGET_ID}
        frameName={FRAME_NAME}
        frameIsMainFrame
        widgetName={WIDGET_NAME}
      />
    ));
  });

  it('has the WidgetFrame--main-frame class', () => {
    expect(component.hasClass('WidgetFrame--main-frame')).toBe(true);
  });
});
