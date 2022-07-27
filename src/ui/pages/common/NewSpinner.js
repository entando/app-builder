import React from 'react';
import PropTypes from 'prop-types';


const NewSpinner = ({ loading }) => (
  (loading) ? (
    <div className="NewSpinner">
      <div className="NewSpinner__spinner">
        <img src={`${process.env.PUBLIC_URL}/images/loader.svg`} alt="spinner" />
      </div>
    </div>) :
    null
);

NewSpinner.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default NewSpinner;
