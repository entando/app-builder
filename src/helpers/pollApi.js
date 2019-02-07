const pollApi = (apiFn, successConditionFn, timeout = 2000, interval = 100) => {
  const endTime = Number(new Date()) + timeout;
  const checkCondition = (resolve, reject) => {
    apiFn().then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          if (successConditionFn(data)) {
            resolve(data);
          } else if (Number(new Date()) < endTime) {
            setTimeout(checkCondition, interval, resolve, reject);
          } else {
            reject({ errors: [{ message: 'Polling timed out' }] });
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
