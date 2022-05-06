import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchMfeConfigList } from 'state/mfe/actions';

export default function MfeDownloadManager(props) {
  const { children } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMfeConfigList());
  }, [dispatch]);


  return <div>{children}</div>;
}

MfeDownloadManager.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
