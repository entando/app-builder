import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsername } from '@entando/apimanager';

import { fetchMfeConfigList } from 'state/mfe/actions';
import StartupWaitScreen from 'app-init/StartupWaitScreen';

export default function MfeDownloadManager(props) {
  const { children } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isPolling, setIsPolling] = useState(false);
  const currentUserName = useSelector(getUsername);

  useEffect(() => {
    // wait until apiManager is not initialised and only after that fetch the mfe config list
    if (currentUserName) {
      const fetchConfig = () => {
        dispatch(fetchMfeConfigList()).then((response) => {
          setLoading(false);
          if (response.ok) {
            setIsPolling(false);
          } else {
            setIsPolling(true);
            setTimeout(fetchConfig, 10000);
          }
        });
      };

      fetchConfig();
    }
  }, [dispatch, currentUserName]);

  return (
    <div>
      { loading || isPolling ? <StartupWaitScreen /> : children }
    </div>
  );
}

MfeDownloadManager.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
