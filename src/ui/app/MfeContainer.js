import { renderMicrofrontend } from 'helpers/microfrontends';
import { withRouter } from 'react-router-dom';
import useMfe from 'hooks/useMfe';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getLocale } from 'state/locale/selectors';
import { getLoggedUserPermissions } from 'state/permissions/selectors';
import { getDomain } from 'helpers/resourcePath';
import { getSystemReport } from 'state/system/selectors';

const MfeContainer = ({ id, history }) => {
  const [assetLoading, mfe] = useMfe(id);
  const locale = useSelector(getLocale);
  const permissions = useSelector(getLoggedUserPermissions);
  const systemReport = useSelector(getSystemReport);

  useEffect(() => {
    if (!window.appBuilderRouter) {
      window.appBuilderRouter = history;
    }
    const entandoWindow = window.entando || {};
    const globals = {
      userPermissions: permissions,
      lang: locale,
      adminConsoleUrl: getDomain(),
      systemReport,
    };

    if (JSON.stringify(entandoWindow.globals || {}) !== JSON.stringify(globals)) {
      window.entando = {
        ...entandoWindow,
        globals,
      };
    }
  }, [history, locale, permissions, systemReport]);

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
