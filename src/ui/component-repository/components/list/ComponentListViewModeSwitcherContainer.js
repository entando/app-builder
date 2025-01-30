import React from 'react';
import { connect } from 'react-redux';
import { setECRComponentListViewMode } from 'state/component-repository/components/actions';
import { getECRComponentListViewMode } from 'state/component-repository/components/selectors';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { ECR_COMPONENTS_GRID_VIEW, ECR_COMPONENTS_LIST_VIEW } from 'state/component-repository/components/const';
import Button from 'ui/common/Button';
import { ButtonGroup } from 'patternfly-react';


const ComponentListViewModeSwitcher = ({ viewMode, changeViewMode }) => {
  const switchToGridView = (e) => {
    e.preventDefault();
    changeViewMode(ECR_COMPONENTS_GRID_VIEW);
  };

  const switchToListView = (e) => {
    e.preventDefault();
    changeViewMode(ECR_COMPONENTS_LIST_VIEW);
  };

  const selectedClass = 'ComponentListViewModeSwitcher__btn--selected active';
  const btnClass = 'ComponentListViewModeSwitcher__btn';

  return (
    <div className="ComponentListViewModeSwitcher">
      <FormattedMessage id="app.view" />
      <ButtonGroup>
        <Button
          className={`${btnClass} ${(viewMode === ECR_COMPONENTS_GRID_VIEW) ? selectedClass : ''}`}
          onClick={switchToGridView}
        >
          <FormattedMessage id="app.grid" />
        </Button>
        <Button
          className={`${btnClass} ${(viewMode === ECR_COMPONENTS_LIST_VIEW) ? selectedClass : ''}`}
          onClick={switchToListView}
        >
          <FormattedMessage id="app.list" />
        </Button>
      </ButtonGroup>
    </div>
  );
};


ComponentListViewModeSwitcher.propTypes = {
  changeViewMode: PropTypes.func.isRequired,
  viewMode: PropTypes.string.isRequired,
};

export const mapDispatchToProps = dispatch => ({
  changeViewMode: (viewMode) => {
    dispatch(setECRComponentListViewMode(viewMode));
  },
});

export const mapStateToProps = state => (
  {
    viewMode: getECRComponentListViewMode(state),
  }
);

const ComponentListViewModeSwitcherContainer =
  connect(mapStateToProps, mapDispatchToProps)(ComponentListViewModeSwitcher);

export default ComponentListViewModeSwitcherContainer;
