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
import { useDynamicResourceUrl } from 'hooks/useDynamicResourceUrl';

const MfeContainer = ({ id, history }) => {
  const { assetLoading, mfe } = useMfe({ mfeId: id });
  const locale = useSelector(getLocale);
  const permissions = useSelector(getLoggedUserPermissions);
  const systemReport = useSelector(getSystemReport);

  const mfeResourceBasePath = useDynamicResourceUrl(mfe.assetsBasePath);

  useEffect(() => {
    const entandoWindow = window.entando || {};
    if (!entandoWindow.router) {
      entandoWindow.router = history;
    }
    const globals = {
      userPermissions: permissions,
      lang: locale,
      adminConsoleUrl: getDomain(),
      systemReport,
    };

    if (JSON.stringify(entandoWindow.globals || {}) !== JSON.stringify(globals)) {
      entandoWindow.globals = globals;
    }

    entandoWindow.epc = entandoWindow.epc || {};
    entandoWindow.epc[mfe.widgetName] =
      entandoWindow.epc[mfe.widgetName] || { basePath: mfeResourceBasePath };

    window.entando = entandoWindow;
  }, [history, locale, mfe.assetsBasePath, mfe.widgetName,
    permissions, systemReport, mfeResourceBasePath]);

  const params = {
    config: {
      systemParams: mfe.systemParams,
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
