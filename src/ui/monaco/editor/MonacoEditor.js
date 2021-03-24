import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Iframe from 'react-iframe';
import { FormattedMessage } from 'react-intl';
import { Button } from 'patternfly-react';
import Editor from '@monaco-editor/react';
import { simulateMouseClick } from 'ui/app-tour/AppTour';

class MonacoEditor extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTogglePreview = this.handleTogglePreview.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleOpenNewTab = this.handleOpenNewTab.bind(this);
    this.state = {
      showPreview: true,
      iframeUrl: 'http://www.youtube.com/embed/xDMP3i36naA',
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    window.onbeforeunload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      return e;
    };
    const navButton = document.querySelector('.navbar-toggle');
    if (navButton) {
      simulateMouseClick(navButton);
    }
    this.props.onFetchFile(this.props.pageName);
  }

  componentDidUpdate(prevProps) {
    const { path, onFetchFile } = this.props;
    const oldFilePath = prevProps !== null && prevProps.path ? prevProps.path : '';
    if (oldFilePath !== path) {
      onFetchFile(path);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e) {
    const { onSaveContent } = this.props;
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      onSaveContent();
    }
  }

  handleTogglePreview() {
    this.setState({ showPreview: !this.state.showPreview });
  }

  handleRefresh() {
    this.setState({ iframeUrl: `${this.state.iframeUrl} ` });
  }

  handleOpenNewTab() {
    const url = this.state.iframeUrl;
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  }

  render() {
    const { file, onContentChange } = this.props;
    return (
      <div className="MonacoEditor">
        <div className="MonacoEditor__content">
          <div className="MonacoEditor__editor">
            <Editor
              height="70vh"
              theme="vs-dark"
              path={file.path}
              defaultLanguage={file.language}
              defaultValue={file.currentContent}
              saveViewState
              onChange={e => onContentChange(e)}
            />
          </div>
          {
            this.state.showPreview && (
              <div className="MonacoEditor__preview">
                <Iframe
                  src={this.state.iframeUrl}
                  width="100%"
                  height="100%"
                  id="iframeId"
                  className="MonacoEditor__preview-iframe"
                  position="relative"
                  allowFullScreen
                />
              </div>
            )
          }
        </div>
        <div className="pull-right" style={{ marginTop: '10px' }}>
          <Button bsStyle="primary" style={{ marginRight: '5px' }} id="PublishPageModal__button-publish" onClick={() => {}}>
            <FormattedMessage id="app.save" />
          </Button>
          <Button bsStyle="success" id="PublishPageModal__button-publish" onClick={() => {}}>
            <FormattedMessage id="app.publish" />
          </Button>
          <Button bsStyle="default" style={{ marginLeft: '5px' }} id="PublishPageModal__button-publish" onClick={this.handleTogglePreview}>
            <FormattedMessage id={`monacoEditor.${this.state.showPreview ? 'hidePreview' : 'showPreview'}`} />
          </Button>
          <Button bsStyle="default" style={{ marginLeft: '5px' }} id="PublishPageModal__button-publish" onClick={this.handleRefresh}>
            <FormattedMessage id="app.refresh" defaultMessage="Refresh" />
          </Button>
          <Button bsStyle="default" style={{ marginLeft: '5px' }} id="PublishPageModal__button-publish" onClick={this.handleOpenNewTab}>
            <FormattedMessage id="monacoEditor.openInNewTab" defaultMessage="Open in a Tab" />
          </Button>
        </div>
      </div>
    );
  }
}

MonacoEditor.propTypes = {
  file: PropTypes.shape({
    path: PropTypes.string,
    language: PropTypes.string,
    currentContent: PropTypes.string,
  }),
  onFetchFile: PropTypes.func.isRequired,
  onContentChange: PropTypes.func.isRequired,
  onSaveContent: PropTypes.func.isRequired,
  path: PropTypes.string,
  pageName: PropTypes.string.isRequired,
};

MonacoEditor.defaultProps = {
  file: {},
  path: '',
};

export default MonacoEditor;
