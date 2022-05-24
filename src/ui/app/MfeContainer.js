import { renderMicrofrontend } from 'helpers/microfrontends';
import { withRouter } from 'react-router-dom';
import useMfe from 'hooks/useMfe';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const MfeContainer = ({ id, history }) => {
  const [assetLoading, mfe] = useMfe(id);

  useEffect(() => {
    if (!window.appBuilderRouter) {
      window.appBuilderRouter = history;
    }
  }, [history]);

  const params = {
    config: {
      api: mfe.api,
    },
  };

  return assetLoading.length
    ? <div>Loading...</div>
    : renderMicrofrontend(mfe.customElement, params);
};

MfeContainer.propTypes = {
  id: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};

export default withRouter(MfeContainer);
