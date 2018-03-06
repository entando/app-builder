const throttle = (func) => {
  setTimeout(func, (Math.floor(Math.random() * 500) + 300));
};

export default throttle;
