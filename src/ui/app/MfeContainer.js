import { renderMicrofrontend } from 'helpers/microfrontends';
import { withRouter } from 'react-router-dom';
import useMfe from 'hooks/useMfe';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getLocale } from 'state/locale/selectors';
import { getLoggedUserPermissions } from 'state/permissions/selectors';

const MfeContainer = ({ id, history }) => {
  const { assetLoading, mfe } = useMfe(id);
  const locale = useSelector(getLocale);
  const permissions = useSelector(getLoggedUserPermissions);

  useEffect(() => {
    if (!window.appBuilderRouter) {
      window.appBuilderRouter = history;
    }
  }, [history]);

  const params = {
    config: {
      api: mfe.api,
      userPermissions: permissions,
      lang: locale,
    },
  };

  return assetLoading
    ? <div>Loading...</div>
    : renderMicrofrontend(mfe.customElement, params);
};

MfeContainer.propTypes = {
  id: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};

export default withRouter(MfeContainer);
