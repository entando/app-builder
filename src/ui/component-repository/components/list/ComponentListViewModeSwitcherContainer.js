import React from 'react';
import { connect } from 'react-redux';
import { setECRComponentListViewMode } from 'state/component-repository/components/actions';
import { getECRComponentListViewMode } from 'state/component-repository/components/selectors';
import PropTypes from 'prop-types';
import { ECR_COMPONENTS_GRID_VIEW, ECR_COMPONENTS_LIST_VIEW } from 'state/component-repository/components/const';


const ComponentListViewModeSwitcher = ({ viewMode, changeViewMode }) => {
  const switchToGridView = (e) => {
    e.preventDefault();
    changeViewMode(ECR_COMPONENTS_GRID_VIEW);
  };

  const switchToListView = (e) => {
    e.preventDefault();
    changeViewMode(ECR_COMPONENTS_LIST_VIEW);
  };

  const selectedClass = 'ComponentListViewModeSwitcher__btn--selected';
  const btnClass = 'ComponentListViewModeSwitcher__btn';

  return (
    <div className="ComponentListViewModeSwitcher">
      <button
        className={`${btnClass} ${(viewMode === ECR_COMPONENTS_GRID_VIEW) ? selectedClass : ''}`}
        onClick={switchToGridView}
      >
        <i className="fa fa-th-large" />
      </button>
      <button
        className={`${btnClass} ${(viewMode === ECR_COMPONENTS_LIST_VIEW) ? selectedClass : ''}`}
        onClick={switchToListView}
      >
        <i className="fa fa-bars" />
      </button>
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
