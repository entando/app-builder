import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsername } from '@entando/apimanager';

import { fetchMfeConfigList } from 'state/mfe/actions';

export default function MfeDownloadManager(props) {
  const { children } = props;
  const dispatch = useDispatch();
  const currentUserName = useSelector(getUsername);

  useEffect(() => {
    // wait until apiManager is not initialised and only after that fetch the mfe config list
    if (currentUserName) {
      dispatch(fetchMfeConfigList());
    }
  }, [dispatch, currentUserName]);


  return <div>{children}</div>;
}

MfeDownloadManager.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
