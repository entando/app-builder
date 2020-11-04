import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import { Button } from 'patternfly-react';

const MODAL_ID = 'DatabaseDumpPage';

function copyContent() {
  const range = document.createRange();
  range.selectNode(document.getElementById('dump_content'));
  window.getSelection().removeAllRanges(); // clear current selection
  window.getSelection().addRange(range); // to select text
  document.execCommand('copy');
  window.getSelection().removeAllRanges();// to deselect
}

class DatabaseDumpTablePage extends Component {
  componentDidMount() {
    this.props.fetchDumpTable();
  }
  componentDidUpdate() {
    this.props.fetchDumpTable();
  }

  render() {
    return (
      <GenericModalContainer modalId={MODAL_ID} modalTitle={<FormattedMessage id="group.detail.title.contents" />} className="DatabaseDumpTablePage" modalFooter={<div />}>
        <div>
          <div className="text-right">
            <Button bsStyle="default" onClick={copyContent}>
              <FormattedMessage id="app.copy" />
            </Button>
          </div>
          <div id="dump_content" className="DatabaseDumpTablePage__code" >
            {JSON.stringify(atob(this.props.dumpData))}
          </div>
        </div>
      </GenericModalContainer>
    );
  }
}
DatabaseDumpTablePage.propTypes = {
  fetchDumpTable: Proptypes.func.isRequired,
  dumpData: Proptypes.string,
};

DatabaseDumpTablePage.defaultProps = {
  dumpData: '',
};
export default DatabaseDumpTablePage;
