const pollApi = ({
  apiFn, stopPollingConditionFn, timeout = 3000, interval = 500 
}) => {
  const endTime = Number(new Date()) + timeout;
  const checkCondition = (resolve, reject) => {
    apiFn().then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          if (stopPollingConditionFn(data)) {
            resolve(data);
          } else if (Number(new Date()) < endTime) {
            setTimeout(checkCondition, interval, resolve, reject);
          } else {
            const { errors, ...otherResponse } = data;
            reject({
              errors: [...errors, { message: 'Polling timed out' }],
              ...otherResponse,
            });
          }
        });
      } else {
        reject(response);
      }
    });
  };
  return new Promise(checkCondition);
};

export default pollApi;
