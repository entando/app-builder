import React from 'react';
import PropTypes from 'prop-types';
import { createController } from './monaco-controller';
import { Tree } from './monaco-utils';


class MonacoTree extends React.Component {
  constructor(props) {
    super(props);

    this.state = { directory: this.props.directory };
  }


  componentDidMount() {
    this.ensureTree();
    this.tree.model.setInput(this.props.directory);
    this.tree.model.onDidSelect((e) => {
      if (e.selection.length) {
        this.props.onClickFile(e.selection[0]);
      }
    });
    document.addEventListener('layout', this.onLayout);
  }

  componentWillReceiveProps(props) {
    if (this.state.directory !== props.directory) {
      this.tree.model.setInput(props.directory);
      this.setState({ directory: props.directory });
    } else {
      this.tree.model.refresh();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('layout', this.onLayout);
  }

  onLayout() {
    this.tree.layout();
  }


  setContainer(container) {
    if (container == null) { return; }
    this.container = container;
  }

  ensureTree() {
    if (this.container.lastChild) {
      this.container.removeChild(this.container.lastChild);
    }

    const { treeConfig, getActions } = this.props;

    treeConfig.controller = createController(this, getActions, true);
    this.tree = new Tree(this.container, treeConfig);
  }


  // eslint-disable-next-line class-methods-use-this
  expandTree(tree) {
    const { model } = tree;
    const elements = [];

    let item;
    const nav = model.getNavigator();

    // eslint-disable-next-line no-cond-assign
    while (item = nav.next()) {
      elements.push(item);
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = elements.length; i < len; i++) {
      model.expand(elements[i]);
    }
  }

  render() {
    return (
      <div className="fill" ref={ref => this.setContainer(ref)} />
    );
  }
}

MonacoTree.propTypes = {
  onClickFile: PropTypes.func.isRequired,
  directory: PropTypes.shape({}).isRequired,
  treeConfig: PropTypes.shape({}).isRequired,
  getActions: PropTypes.func.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { MonacoTree };
