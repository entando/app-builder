import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchMfeConfigList } from 'state/mfe/actions';
import RowSpinner from 'ui/pages/common/RowSpinner';

export default function MfeDownloadManager(props) {
  const { children } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    dispatch(fetchMfeConfigList()).then(() => setLoading(false));
  }, [dispatch]);


  return <div>{loading ? <div className="shell-preload"><RowSpinner loading /></div> : children}</div>;
}

MfeDownloadManager.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
