import React from 'react';
import PropTypes from 'prop-types';


const RowSpinner = ({ loading }) => (
  (loading) ? (
    <div className="RowSpinner">
      <div className="RowSpinner__spinner spinner spinner-sm" />
    </div>) :
    null
);

RowSpinner.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default RowSpinner;
