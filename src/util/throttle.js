const throttle = (func) => {
  setTimeout(func, (Math.floor(Math.random() * 700) + 300));
};

export default throttle;
