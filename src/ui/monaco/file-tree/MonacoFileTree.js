import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'patternfly-react';
import DeleteFileOrFolderModalContainer from 'ui/monaco/file-tree/modals/DeleteFileOrFolderModalContainer';
import CreateNewFileOrFolderModalContainer from 'ui/monaco/file-tree/modals/CreateNewFileOrFolderModalContainer';

import { MonacoTree, TreeDnD, generateDirectoryTree, FileTemplate, Action, Separator } from './index';


import './assets/main.css';
import './assets/vscode-icons.css';

const rootDirectoryName = 'demo';

const TREE_CONFIG = {
  dataSource: {
    /**
           * Returns the unique identifier of the given element.
           * No more than one element may use a given identifier.
           */
    getId(tree, element) {
      return element.key;
    },

    /**
           * Returns a boolean value indicating whether the element has children.
           */
    hasChildren(tree, element) {
      return element.isDirectory;
    },

    /**
           * Returns the element's children as an array in a promise.
           */
    getChildren(tree, element) {
      return Promise.resolve(element.children);
    },

    /**
           * Returns the element's parent in a promise.
           */
    getParent(tree, element) {
      return Promise.resolve(element.parent);
    },
  },
  renderer: {
    getHeight() {
      return 24;
    },
    renderTemplate(tree, templateId, container) {
      return new FileTemplate(container);
    },
    renderElement(tree, element, templateId, templateData) {
      templateData.set(element);
    },
    disposeTemplate() {
      FileTemplate.dispose();
    },
  },

  // tree config requires a controller property but we would defer its initialisation
  // to be done by the MonacoTree component
  // controller: createController(this, this.getActions.bind(this), true),
  dnd: new TreeDnD(),
};

class MonacoFileTree extends React.Component {
  constructor(props) {
    super(props);
    this.rootDirectoryName = 'demo';

    this.state = {
      rootNode: null,
      treeConfig: TREE_CONFIG,
    };
    this.getActions = this.getActions.bind(this);
    this.onClickFile = this.onClickFile.bind(this);
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      rootNode: generateDirectoryTree(this.props.filePathsList, rootDirectoryName),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  onDoubleClickFile(file) {
    console.log(`${file.name} double clicked`);
  }

  onClickFile(file) {
    const { onOpenFile } = this.props;
    if (file.isDirectory) {
      return;
    }

    if (Date.now() - this.lastClickedTime < 500 && this.lastClickedFile === file) {
      this.onDoubleClickFile(file);
    } else {
      console.log(`${file.name} clicked`);
    }

    this.lastClickedTime = Date.now();
    this.lastClickedFile = file;
    onOpenFile(file.path);
  }

  /**
     * Get Action
  */
  getActions(file) {
    const { onDelete, onCreateNew } = this.props;
    const actions = [];

    // Directory options
    if (file.isDirectory) {
      actions.push(new Action('1', 'New File', '', true, () => {
        onCreateNew(`${file.parent.path}/${file.name}`, false);
      }));

      // menu separator
      actions.push(new Separator());

      actions.push(new Action('2', 'New Directory', '', true, () => {
        onCreateNew(`${file.parent.path}/${file.name}`, true);
      }));

      // actions.push(new Action('3', 'Upload Files', '', true, () => {
      //   console.log(`action Upload Files on ${file.name}`);
      // }));
    }


    // actions.push(new Action('4', 'Download', '', true, () => {
    //   console.log(`action Download on ${file.name}`);
    // }));

    actions.push(new Action('5', 'Delete', '', true, () => {
      onDelete(`${file.parent.path}/${file.name}`);
    }));


    return actions;
  }

  render() {
    const { loading, rootNode } = this.props;
    return (
      <div
        className="vs-dark show-file-icons show-folder-icons"
        style={{
        width: '100%',
        height: '800px',
        paddingBottom: '20px',
        outline: 'none',
        }}
      >
        <Spinner loading={!!loading} >
          <div className="workspaceContainer">
            {
              !this.state.rootNode
              ?
              null
              :
              (
                <MonacoTree
                  directory={rootNode}
                  treeConfig={this.state.treeConfig}
                  getActions={this.getActions}
                  onClickFile={this.onClickFile}
                />
              )
          }
          </div>
          <DeleteFileOrFolderModalContainer />
          <CreateNewFileOrFolderModalContainer />
        </Spinner>

      </div>
    );
  }
}

MonacoFileTree.propTypes = {
  loading: PropTypes.bool,
  filePathsList: PropTypes.arrayOf(PropTypes.string),
  rootNode: PropTypes.shape({}),
  onDidMount: PropTypes.func.isRequired,
  onOpenFile: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCreateNew: PropTypes.func.isRequired,
};

MonacoFileTree.defaultProps = {
  loading: false,
  filePathsList: [],
  rootNode: {},
};

export default MonacoFileTree;
