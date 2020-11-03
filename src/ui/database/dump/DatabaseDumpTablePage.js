import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import {
  EmptyState,
  EmptyStateIcon, EmptyStateTitle, EmptyStateInfo,
} from 'patternfly-react';

const MODAL_ID = 'DatabaseDumpPage';

class DatabaseDumpTablePage extends Component {
  componentDidMount() {
    this.props.onDidMount();
  }
  render() {
    return (
      <GenericModalContainer modalId={MODAL_ID} modalTitle="Test" className="DatabaseDumpTablePage">
        <EmptyState>
          <EmptyStateIcon name="exclamation" type="fa" className="DeleteCategoryModal__icon" />
          <EmptyStateTitle>
            <FormattedMessage id="app.delete" />
          </EmptyStateTitle>
          <EmptyStateInfo className="DeleteCategoryModal__info">
            <div className="DatabaseDumpTablePage" >
              {JSON.stringify(atob(this.props.dumpData))}
            </div>
          </EmptyStateInfo>
        </EmptyState>
      </GenericModalContainer>
    );
  }
}
DatabaseDumpTablePage.propTypes = {
  onDidMount: Proptypes.func.isRequired,
  dumpData: Proptypes.string,
};

DatabaseDumpTablePage.defaultProps = {
  dumpData: '',
};
export default DatabaseDumpTablePage;
