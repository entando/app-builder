import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { compact } from 'lodash';

const enlinkIcon = (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    enableBackground="new 0 0 16 16"
    xmlSpace="preserve"
  >
    <image
      id="image0"
      width="16"
      height="16"
      x="0"
      y="0"
      xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
        AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAMFBMVEUeQ0MDTcdT7GJE3VNR
        7F5U7mAEWPQTW9oMNzcNODj///+/v8ADMDCjpKTg4OAkRUUj2p/SAAAAAXRSTlMAQObYZgAAAAFi
        S0dECmjQ9FYAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfkARwLHiiLD0pnAAAAe0lEQVQI
        10XKsQ3CQAwF0E9zUFBgM4G9SxahYQ3KEwrQnrMBQexw5SnyCIyCBA4psPT1n/QN/G9FtDTLon0n
        LLsAq7AGUqfEGlvSGQKsD/HLgXQMUGCTjcwMKOPdhkc5wbzZxXPFkKfx2c4V5dq7t1dFvr3dP16x
        df/lC9PiJtEPoGmfAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTAxLTI4VDExOjMwOjQwKzAzOjAw
        M9UWxAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wMS0yOFQxMTozMDo0MCswMzowMEKIrngAAAAA
        SUVORK5CYII="
    />
  </svg>
);

const enunlinkIcon = (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    enableBackground="new 0 0 16 16"
    xmlSpace="preserve"
  >
    <image
      id="image0"
      width="16"
      height="16"
      x="0"
      y="0"
      xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
        AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAJ1BMVEUeQ0MDTcdT7GJE3VNR
        7F5U7mANODj///8MNzcDMDCjpKTg4OAkRUXjqwDkAAAAAXRSTlMAQObYZgAAAAFiS0dEBxZhiOsA
        AAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfkARwLIhtHLFKOAAAAdElEQVQI10XLsQ3CUAwE
        0PtNpHSckdLbEqOwB5XDBERs8AMUdMQSCzBKtsJfQcLNPenOwP8KuaXopv1RRXcJMRVLlINRLLti
        DfrbSgMT7a1z5+B+gk8XcuoqPBbys8wY6ytRrzjfZzJugfpYgfca6COAiOcX/1wZvr9xoxEAAAAl
        dEVYdGRhdGU6Y3JlYXRlADIwMjAtMDEtMjhUMTE6MzQ6MjcrMDM6MDA59oG3AAAAJXRFWHRkYXRl
        Om1vZGlmeQAyMDIwLTAxLTI4VDExOjM0OjI3KzAzOjAwSKs5CwAAAABJRU5ErkJggg=="
    />
  </svg>
);

const undoIcon = (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path className="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9" />
  </svg>
);

const redoIcon = (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path className="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5" />
  </svg>
);

const tableIcon = (
  <svg viewBox="0 0 18 18">
    <rect className="ql-stroke-miter" height="12" width="12" x="3" y="3" />
    <line className="ql-stroke-miter" x1="9" x2="9" y1="3" y2="15" />
    <line className="ql-stroke-miter" x1="15" x2="3" y1="9" y2="9" />
  </svg>
);

const tableInsertRowIcon = (
  <svg viewBox="0 0 18 18">
    <g className="ql-fill ql-stroke ql-thin ql-transparent">
      <rect height="3" rx="0.5" ry="0.5" width="7" x="4.5" y="2.5" />
      <rect height="3" rx="0.5" ry="0.5" width="7" x="4.5" y="12.5" />
    </g>
    <rect className="ql-fill ql-stroke ql-thin" height="3" rx="0.5" ry="0.5" width="7" x="8.5" y="7.5" />
    <polygon className="ql-fill ql-stroke ql-thin" points="4.5 11 2.5 9 4.5 7 4.5 11" />
    <line className="ql-stroke" x1="6" x2="4" y1="9" y2="9" />
  </svg>
);

const tableInsertColumnIcon = (
  <svg viewBox="0 0 18 18">
    <g className="ql-fill ql-transparent">
      <rect height="10" rx="1" ry="1" width="4" x="12" y="2" />
      <rect height="10" rx="1" ry="1" width="4" x="2" y="2" />
    </g>
    <path className="ql-fill" d="M11.354,4.146l-2-2a0.5,0.5,0,0,0-.707,0l-2,2A0.5,0.5,0,0,0,7,5H8V6a1,1,0,0,0,2,0V5h1A0.5,0.5,0,0,0,11.354,4.146Z" />
    <rect className="ql-fill" height="8" rx="1" ry="1" width="4" x="7" y="8" />
  </svg>
);

const tableDeleteRowIcon = (
  <svg viewBox="0 0 18 18">
    <g className="ql-fill ql-stroke ql-thin ql-transparent">
      <rect height="3" rx="0.5" ry="0.5" width="7" x="4.5" y="2.5" />
      <rect height="3" rx="0.5" ry="0.5" width="7" x="4.5" y="12.5" />
    </g>
    <rect className="ql-fill ql-stroke ql-thin" height="3" rx="0.5" ry="0.5" width="7" x="8.5" y="7.5" />
    <line className="ql-stroke ql-thin" x1="6.5" x2="3.5" y1="7.5" y2="10.5" />
    <line className="ql-stroke ql-thin" x1="3.5" x2="6.5" y1="7.5" y2="10.5" />
  </svg>
);

const tableDeleteColumnIcon = (
  <svg viewBox="0 0 18 18">
    <g className="ql-fill ql-transparent">
      <rect height="10" rx="1" ry="1" width="4" x="2" y="6" />
      <rect height="10" rx="1" ry="1" width="4" x="12" y="6" />
    </g>
    <rect className="ql-fill" height="8" rx="1" ry="1" width="4" x="7" y="2" />
    <path className="ql-fill" d="M9.707,13l1.146-1.146a0.5,0.5,0,0,0-.707-0.707L9,12.293,7.854,11.146a0.5,0.5,0,0,0-.707.707L8.293,13,7.146,14.146a0.5,0.5,0,1,0,.707.707L9,13.707l1.146,1.146a0.5,0.5,0,0,0,.707-0.707Z" />
  </svg>
);

const tableDeleteIcon = (
  <svg viewBox="0 0 18 18">
    <path className="ql-fill" d="M15.707,7l1.146-1.146a0.5,0.5,0,1,0-.707-0.707L15,6.293,13.854,5.146a0.5,0.5,0,0,0-.707.707L14.293,7,13.146,8.146a0.5,0.5,0,1,0,.707.707L15,7.707l1.146,1.146a0.5,0.5,0,1,0,.707-0.707Z" />
    <path className="ql-fill" d="M6,5H3A1,1,0,0,0,2,6V8A1,1,0,0,0,3,9H6V5Z" />
    <path className="ql-fill" d="M10,5H7V9h3a1,1,0,0,0,1-1V6A1,1,0,0,0,10,5Z" />
    <g className="ql-fill ql-transparent">
      <path d="M8,11h4V9a1,1,0,0,0-1-1H8v3Z" />
      <path d="M7,11V8H4A1,1,0,0,0,3,9v2H7Z" />
      <path d="M7,12H3v2a1,1,0,0,0,1,1H7V12Z" />
      <path d="M8,12v3h3a1,1,0,0,0,1-1V12H8Z" />
      <path d="M8,6h3a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H8V6Z" />
      <path d="M4,6H7V2H4A1,1,0,0,0,3,3V5A1,1,0,0,0,4,6Z" />
    </g>
  </svg>
);

const hrIcon = (
  <svg viewBox="0 0 18 18">
    <path className="ql-fill" d="M15,12v2a.99942.99942,0,0,1-1,1H4a.99942.99942,0,0,1-1-1V12a1,1,0,0,1,2,0v1h8V12a1,1,0,0,1,2,0ZM14,3H4A.99942.99942,0,0,0,3,4V6A1,1,0,0,0,5,6V5h8V6a1,1,0,0,0,2,0V4A.99942.99942,0,0,0,14,3Z" />
    <path className="ql-fill" d="M15,10H3A1,1,0,0,1,3,8H15a1,1,0,0,1,0,2Z" />
  </svg>
);

const maximizeIcon = (
  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="expand-arrows-alt" className="svg-inline--fa fa-expand-arrows-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path fill="currentColor" d="M448 344v112a23.94 23.94 0 0 1-24 24H312c-21.39 0-32.09-25.9-17-41l36.2-36.2L224 295.6 116.77 402.9 153 439c15.09 15.1 4.39 41-17 41H24a23.94 23.94 0 0 1-24-24V344c0-21.4 25.89-32.1 41-17l36.19 36.2L184.46 256 77.18 148.7 41 185c-15.1 15.1-41 4.4-41-17V56a23.94 23.94 0 0 1 24-24h112c21.39 0 32.09 25.9 17 41l-36.2 36.2L224 216.4l107.23-107.3L295 73c-15.09-15.1-4.39-41 17-41h112a23.94 23.94 0 0 1 24 24v112c0 21.4-25.89 32.1-41 17l-36.19-36.2L263.54 256l107.28 107.3L407 327.1c15.1-15.2 41-4.5 41 16.9z" />
  </svg>
);

const ToolbarGroup = ({ children, className }) => (
  <span
    className={compact(['ql-formats', className]).join(' ')}
  >
    {children}
  </span>
);

ToolbarGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ToolbarGroup.defaultProps = {
  className: '',
};

const renderToolbarButton = (format, value, icon, tooltipText) => (
  <button className={`ql-${format}`} value={value} type="button" title={tooltipText}>
    {icon}
  </button>
);

const EditorToolbar = ({ intl, name, extraOptions }) => (
  <div id={name} style={{ borderBottom: 'none' }}>
    <ToolbarGroup>
      {renderToolbarButton('history', 'undo', undoIcon, intl.formatMessage({ id: 'rte.undoWithExample' }))}
      {renderToolbarButton('history', 'redo', redoIcon, intl.formatMessage({ id: 'rte.redoWithExample' }))}
    </ToolbarGroup>
    <ToolbarGroup>
      {renderToolbarButton('entable', 'table', tableIcon, intl.formatMessage({ id: 'rte.insertTable' }))}
      {renderToolbarButton('entable', 'table-insert-row', tableInsertRowIcon, intl.formatMessage({ id: 'rte.insertTableRow' }))}
      {renderToolbarButton('entable', 'table-insert-column', tableInsertColumnIcon, intl.formatMessage({ id: 'rte.insertTableColumn' }))}
      {renderToolbarButton('entable', 'table-delete-row', tableDeleteRowIcon, intl.formatMessage({ id: 'rte.deleteTableRow' }))}
      {renderToolbarButton('entable', 'table-delete-column', tableDeleteColumnIcon, intl.formatMessage({ id: 'rte.deleteTableColumn' }))}
      {renderToolbarButton('entable', 'table-delete', tableDeleteIcon, intl.formatMessage({ id: 'rte.deleteTable' }))}
      {renderToolbarButton('divider', undefined, hrIcon, intl.formatMessage({ id: 'rte.insertHorizontalLine' }))}
      {renderToolbarButton('specialChar', undefined, 'Ω', intl.formatMessage({ id: 'rte.insertSpecialChar' }))}
    </ToolbarGroup>
    <ToolbarGroup>
      {renderToolbarButton('maximize', undefined, maximizeIcon, intl.formatMessage({ id: 'rte.maximize' }))}
    </ToolbarGroup>
    <ToolbarGroup>
      {renderToolbarButton('bold', undefined, undefined, intl.formatMessage({ id: 'rte.boldWithExample' }))}
      {renderToolbarButton('italic', undefined, undefined, intl.formatMessage({ id: 'rte.italicWithExample' }))}
      {renderToolbarButton('strike', undefined, undefined, intl.formatMessage({ id: 'rte.strikethrough' }))}
    </ToolbarGroup>
    <ToolbarGroup>
      {renderToolbarButton('clean', undefined, undefined, intl.formatMessage({ id: 'rte.removeFormat' }))}
    </ToolbarGroup>
    <ToolbarGroup>
      {renderToolbarButton('list', 'ordered', undefined, intl.formatMessage({ id: 'rte.toggleNumberList' }))}
      {renderToolbarButton('list', 'bullet', undefined, intl.formatMessage({ id: 'rte.toggleBulletedList' }))}
    </ToolbarGroup>
    <ToolbarGroup>
      {renderToolbarButton('indent', '-1', undefined, intl.formatMessage({ id: 'rte.decreaseIndent' }))}
      {renderToolbarButton('indent', '+1', undefined, intl.formatMessage({ id: 'rte.increaseIndent' }))}
    </ToolbarGroup>
    <ToolbarGroup>
      {renderToolbarButton('blockquote', undefined, undefined, intl.formatMessage({ id: 'rte.blockQuote' }))}
    </ToolbarGroup>
    <ToolbarGroup>
      {renderToolbarButton('enlink', 'link', enlinkIcon, intl.formatMessage({ id: 'rte.link' }))}
      {renderToolbarButton('enlink', 'unlink', enunlinkIcon, intl.formatMessage({ id: 'rte.unlink' }))}
    </ToolbarGroup>
    <ToolbarGroup>
      {renderToolbarButton('viewSource', undefined, undefined, intl.formatMessage({ id: 'rte.source' }))}
    </ToolbarGroup>
    {extraOptions && (
      <ToolbarGroup className="pull-right">{extraOptions}</ToolbarGroup>
    )}
  </div>
);

EditorToolbar.propTypes = {
  intl: intlShape.isRequired,
  name: PropTypes.string,
  extraOptions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

EditorToolbar.defaultProps = {
  name: 'editor-toolbar',
  extraOptions: null,
};

export default injectIntl(EditorToolbar);
