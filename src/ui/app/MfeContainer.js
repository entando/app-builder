import { renderMicrofrontend } from 'helpers/microfrontends';
import useMfe from 'hooks/useMfe';
import React from 'react';
import PropTypes from 'prop-types';

const MfeContainer = ({ id }) => {
  const [assetLoading, mfe] = useMfe(id);

  return assetLoading.length
    ? <div>Loading...</div> : renderMicrofrontend(mfe.customElement, { api: mfe.api });
};

MfeContainer.propTypes = {
  id: PropTypes.string.isRequired,
};

export default MfeContainer;
