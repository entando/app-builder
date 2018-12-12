import React from 'react';
import { connect } from 'react-redux';
import { setDEComponentListViewMode } from 'state/digital-exchange/components/actions';
import { getDEComponentListViewMode } from 'state/digital-exchange/components/selectors';
import PropTypes from 'prop-types';
import { DE_COMPONENTS_GRID_VIEW, DE_COMPONENTS_LIST_VIEW } from 'state/digital-exchange/components/const';


const ComponentListViewModeSwitcher = ({ viewMode, changeViewMode }) => {
  const switchToGridView = (e) => {
    e.preventDefault();
    changeViewMode(DE_COMPONENTS_GRID_VIEW);
  };

  const switchToListView = (e) => {
    e.preventDefault();
    changeViewMode(DE_COMPONENTS_LIST_VIEW);
  };

  const selectedClass = 'ComponentListViewModeSwitcher__btn--selected';
  const btnClass = 'ComponentListViewModeSwitcher__btn';

  return (
    <div className="ComponentListViewModeSwitcher">
      <div className="">
        <button
          className={`${btnClass} ${(viewMode === DE_COMPONENTS_GRID_VIEW) ? selectedClass : ''}`}
          onClick={switchToGridView}
        >
          <i className="fa fa-th-large" />
        </button>
        <button
          className={`${btnClass} ${(viewMode === DE_COMPONENTS_LIST_VIEW) ? selectedClass : ''}`}
          onClick={switchToListView}
        >
          <i className="fa fa-bars" />
        </button>
      </div>
    </div>
  );
};


ComponentListViewModeSwitcher.propTypes = {
  changeViewMode: PropTypes.func.isRequired,
  viewMode: PropTypes.string.isRequired,
};

export const mapDispatchToProps = dispatch => ({
  changeViewMode: (viewMode) => {
    dispatch(setDEComponentListViewMode(viewMode));
  },
});

export const mapStateToProps = state => (
  {
    viewMode: getDEComponentListViewMode(state),
  }
);

const ComponentListViewModeSwitcherContainer =
  connect(mapStateToProps, mapDispatchToProps)(ComponentListViewModeSwitcher);

export default ComponentListViewModeSwitcherContainer;
