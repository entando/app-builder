import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsername } from '@entando/apimanager';

import { fetchMfeConfigList } from 'state/mfe/actions';
import StartupWaitScreen from 'ui/app/StartupWaitScreen';
import RowSpinner from 'ui/pages/common/RowSpinner';
import { selectCurrentTenant, selectIsPrimaryTenant } from 'state/multi-tenancy/selectors';
import { fetchCurrentTenant } from 'state/multi-tenancy/actions';

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
  const [loading, setLoading] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const currentUserName = useSelector(getUsername);
  const currentTenant = useSelector(selectCurrentTenant);
  const isPrimaryTenant = useSelector(selectIsPrimaryTenant);

  useEffect(() => {
    // wait until apiManager is not initialised and only after that fetch the mfe config list
    if (currentUserName) {
      let configPolling;

      const fetchConfig = () => {
        setLoading(true);
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

  useEffect(() => {
    dispatch(fetchCurrentTenant());
  }, [dispatch]);

  // check if currentTenant is empty object
  if (loading || currentTenant === undefined ||
    (currentTenant !== null && Object.keys(currentTenant).length === 0)) {
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
