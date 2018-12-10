import React from 'react';
import { connect } from 'react-redux';
import { setDEComponentsListViewMode } from 'state/digital-exchange/components/actions';
import PropTypes from 'prop-types';


const ComponentListViewModeSwitcher = ({ changeViewMode }) => {
  function handleClick(e) {
    e.preventDefault();
    changeViewMode('grid-view');
  }

  return (
    <div className="ComponentListViewModeSwitcher">
      <button onClick={handleClick}>
        Switch to Grid view
      </button>
    </div>
  );
};


ComponentListViewModeSwitcher.propTypes = {
  changeViewMode: PropTypes.func.isRequired,
};

export const mapDispatchToProps = dispatch => ({
  changeViewMode: (viewMode) => {
    dispatch(setDEComponentsListViewMode(viewMode));
  },
});


const ComponentListViewModeSwitcherContainer =
  connect(null, mapDispatchToProps)(ComponentListViewModeSwitcher);

export default ComponentListViewModeSwitcherContainer;
