import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsername } from '@entando/apimanager';

import { fetchMfeConfigList } from 'state/mfe/actions';
import StartupWaitScreen from 'ui/app/StartupWaitScreen';
import RowSpinner from 'ui/pages/common/RowSpinner';
import { selectIsPrimaryTenant } from 'state/multi-tenancy/selectors';

const MFE_MANDATORY_SLOT = ['primary-menu'];

function isReady(payload) {
  return (
    payload.length > 0 &&
    Boolean(payload.find(mfe => MFE_MANDATORY_SLOT.includes(mfe.descriptorExt.slot)))
  );
}
export default function MfeDownloadManager(props) {
  const { children } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isPolling, setIsPolling] = useState(false);
  const currentUserName = useSelector(getUsername);
  const isPrimaryTenant = useSelector(selectIsPrimaryTenant);

  useEffect(() => {
    // wait until apiManager is not initialised and only after that fetch the mfe config list
    if (currentUserName) {
      let configPolling;

      const fetchConfig = () => {
        clearTimeout(configPolling);
        dispatch(fetchMfeConfigList('', false)).then((res) => {
          if (isReady(res.payload)) {
            setIsPolling(false);
            setLoading(false);
            clearTimeout(configPolling);
          } else {
            setIsPolling(true);
            setLoading(false);
            configPolling = setTimeout(fetchConfig, 10000);
          }
        }).catch(() => {
          // if fails, start polling until it succeed
          setIsPolling(true);
          setLoading(false);
          configPolling = setTimeout(fetchConfig, 10000);
        });
      };
      if (isPrimaryTenant) {
        fetchConfig();
      }
    }
  }, [dispatch, currentUserName, isPrimaryTenant]);

  if (loading) {
    return <div className="shell-preload"><RowSpinner loading /></div>;
  } else if (isPolling) {
    return <StartupWaitScreen />;
  }

  return children;
}

MfeDownloadManager.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
