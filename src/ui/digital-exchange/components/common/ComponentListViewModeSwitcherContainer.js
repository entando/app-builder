import React from 'react';
import { connect } from 'react-redux';
import { setDEComponentsListViewMode } from 'state/digital-exchange/components/actions';
import { getDEComponentListViewMode } from 'state/digital-exchange/components/selectors';
import PropTypes from 'prop-types';


const ComponentListViewModeSwitcher = ({ viewMode, changeViewMode }) => {
  function switchToGridView(e) {
    e.preventDefault();
    changeViewMode('grid-view');
  }

  function switchToListView(e) {
    e.preventDefault();
    changeViewMode('list-view');
  }
  const selectedClass = 'ComponentListViewModeSwitcher__btn--selected';
  const btnClass = 'ComponentListViewModeSwitcher__btn';

  return (
    <div className="ComponentListViewModeSwitcher">
      <div className="">
        <button
          className={`${btnClass} ${(viewMode === 'grid-view') ? selectedClass : ''}`}
          onClick={switchToGridView}
        >
          <i className="fa fa-th-large" />
        </button>
        <button
          className={`${btnClass} ${(viewMode === 'list-view') ? selectedClass : ''}`}
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
    dispatch(setDEComponentsListViewMode(viewMode));
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
