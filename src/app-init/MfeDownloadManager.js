import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsername } from '@entando/apimanager';

import { fetchMfeConfigList } from 'state/mfe/actions';
import StartupWaitScreen from 'ui/app/StartupWaitScreen';
import RowSpinner from 'ui/pages/common/RowSpinner';

export default function MfeDownloadManager(props) {
  const { children } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isPolling, setIsPolling] = useState(false);
  const currentUserName = useSelector(getUsername);

  useEffect(() => {
    // wait until apiManager is not initialised and only after that fetch the mfe config list
    if (currentUserName) {
      let configPolling;
      const fetchConfig = () => {
        clearTimeout(configPolling);
        dispatch(fetchMfeConfigList('', false)).then(() => {
          setLoading(false);
          setIsPolling(false);
        }).catch(() => {
          // if fails, start polling until it succeed
          setLoading(false);
          setIsPolling(true);
          configPolling = setTimeout(fetchConfig, 10000);
        });
      };

      fetchConfig();
    }
  }, [dispatch, currentUserName]);

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
