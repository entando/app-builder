import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserSettings, updateUserSettings } from 'state/user-settings/actions';
import RestrictionsForm from 'ui/users/restrictions/RestrictionsForm';
import { getLoading } from 'state/loading/selectors';
import { getUserSettings } from 'state/user-settings/selectors';

const RestrictionsFormContainer = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading).userSettings;
  const userSettings = useSelector(getUserSettings);

  const { maxMonthsPasswordValid, lastAccessPasswordExpirationMonths } = userSettings;

  const initialValues = useMemo(() => ({
    ...userSettings,
    maxMonthsPasswordValid:
      maxMonthsPasswordValid === null ? 0 : maxMonthsPasswordValid,
    lastAccessPasswordExpirationMonths:
      lastAccessPasswordExpirationMonths === null ? 0 : lastAccessPasswordExpirationMonths,
  }), [userSettings, maxMonthsPasswordValid, lastAccessPasswordExpirationMonths]);

  const handleMount = useCallback(() => {
    dispatch(fetchUserSettings());
  }, [dispatch]);

  const handleSubmit = useCallback((values) => {
    dispatch(updateUserSettings({ ...values, restrictionsActive: !values.passwordAlwaysActive }));
  }, [dispatch]);

  return (
    <RestrictionsForm
      loading={loading}
      onMount={handleMount}
      onSubmit={handleSubmit}
      initialValues={initialValues}
    />
  );
};

export default RestrictionsFormContainer;
