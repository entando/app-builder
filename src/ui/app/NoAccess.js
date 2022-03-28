import React from 'react';
import PropTypes from 'prop-types';
import { NoAccessPage } from '@entando/pages';

export default function NoAccess(props) {
  const { gotoHomepage } = props;
  return (<NoAccessPage
    gotoHome={gotoHomepage}
  />);
}

NoAccess.propTypes = {
  gotoHomepage: PropTypes.func.isRequired,
};
